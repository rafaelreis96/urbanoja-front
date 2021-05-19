import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input, HostListener, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { BoxUploadService } from './box-upload.service';

@Component({
  selector: 'app-box-upload',
  templateUrl: './box-upload.component.html',
  styleUrls: ['./box-upload.component.scss']
})
export class BoxUploadComponent implements OnInit {
  files: File[] = [];
  srcList: any[] = [];
  filesUploaded: any[] = [];

  isDrag = false;
  isBlocked = false;
  randId = 0;
  progress=0;
  isLoadImagem=false;
  msgError = null;

  //list,box
  preview: string;

  @Input() limite = 1;
  @Input() multiple = false;
  @Input() accept = 'image/*';
  @Input('upload') isUpload = false;
  @Input() cols = 4;
  @Input() rowHeight = '4:3';
  @Input() thumbnail = 'thumbnail';
  @Input() styleCss: Object;
  @Input() urlParam = null;
  @Input() data: any;
  @Output() selected = new EventEmitter();
  @Output() uploaded = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor(
    private uploadService: BoxUploadService,
    private sanitizer: DomSanitizer,
    private matDialog: MatDialog) { }

  ngOnInit() {
    this.randId = Math.floor((Math.random() * 1000) + 1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['data'] && this.data) {
      console.log(this.data)
      if(Array.isArray(this.data)) {
        this.data.forEach(element => {
          if(element.hasOwnProperty(this.thumbnail)) {
            this.srcList.push(element[this.thumbnail]);
            this.filesUploaded.push(element);
          }
        });
      } else {
        if(typeof this.data == "string") {
          console.log("STRING")
          this.srcList.push(this.data);
        } else if(this.data.hasOwnProperty(this.thumbnail)) {
          this.srcList.push(this.data[this.thumbnail]);
        }
        this.filesUploaded.push(this.data);
      }

    }
  }

  @HostListener('document:dragover', ['$event'])
  documentDragover(event){
    event.preventDefault();
  }

  @HostListener('document:drop', ['$event'])
  documentDrop(event){
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event'])
  onDragleave(event){
    event.preventDefault();
    this.isDrag = false;
  }

  @HostListener('dragover', ['$event'])
  onDragover(event){
    event.preventDefault();
    this.isDrag = true;
  }

  @HostListener('drop', ['$event'])
  onDrop(event){
    event.preventDefault();
    this.isDrag = false;
    this.addFiles(event.dataTransfer.files);
  }

  @HostListener('change', ['$event'])
  onChange(event){
    event.preventDefault();
    this.addFiles(event.target.files);
  }

  stylePreview() {
    if(this.srcList.length > 0) {
      return this.multiple ? 'grid' : 'img';
    } else if(this.files.length > 0 && this.isImagem(this.files[0])) {
      return this.multiple ? 'grid' : 'img';
    } else if(this.files.length > 0) {
      return 'list';
    }
  }

  displayError(text: string) {
    this.msgError = text;
    setTimeout(() => this.msgError = null, 3000);
  }

  isImagem(file: File) {
    return (RegExp('^image')).test(file.type)
  }

  addFiles(files: File[]){
    if(files.length > this.limite){
      this.displayError(`Limite máximo de ${this.limite} arquivos`);
    } else if(files.length > 0 ){
      for(let i = 0; i < files.length; i++) {
        if(this.isUpload === false) {
          this.addSrcList(files[i]);
        }

        this.files.push(files[i]);
      }

      //console.log(this.files)

      if(this.isUpload) {
        this.progress = 0;
        this.uploadFiles();
      } else {
        this.selected.emit(this.files);
      }
    }

  }

  uploadFiles() {
    const formData = new FormData();

    if(this.files.length  === 1) {
      formData.append('files', this.files[0]);
    } else if(this.files.length  > 1) {
      this.files.forEach(file => formData.append('files[]', file));
    }

    this.uploadService.upload(this.urlParam, formData)
    .subscribe((event: HttpEvent<any>) => {
      switch(event.type) {
        case HttpEventType.Sent:
          //console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          //console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          //console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          if(Array.isArray(event.body)) {
            event.body.forEach((element) => {
              this.filesUploaded.push(element)
              this.srcList.push(element[this.thumbnail]);
            });
          } else {
            this.filesUploaded = event.body;
            this.srcList.push(event.body[this.thumbnail]);
          }

          this.uploaded.emit(this.filesUploaded);
        break;
      }
    },
    error => {
      this.reset();
      this.displayError(`Falha no upload! ${error.statusText}`);
    }, () => {
      this.files = [];
      this.progress = 0;
      //console.log(this.srcList)
    });
  }

  reset() {
    this.files = [];
    this.urlParam = null;
    this.srcList = [];
    this.progress = 0;
    this.isBlocked = false;
    this.preview = null;
  }

  remover(index: number) {
    this.files.splice(index, 1);
    this.srcList.splice(index, 1);

    if(this.isUpload) {
      this.deleted.emit(this.filesUploaded[index]);
    } else {
      this.deleted.emit(this.files[index]);
    }

    if(this.srcList.length === 0 && this.preview) {
      this.preview = null;
    }
  }

  calcTamanho(num: number){
    const kb = 1024;
    const mb = 1024 * 1024;
    const gb = 1024 * 1024 * 1024;

    if(num < kb) {
      return (num / kb).toFixed(1) + 'b';
    } else if(num >= kb && num < mb) {
      return (num / kb).toFixed(1) + 'Kb';
    } else if( num >= mb && num < gb){
      return (num / mb).toFixed(1) + 'Mb';
    } else {
      return (num / gb).toFixed(1) + 'Gb';
    }
  }

  addSrcList(file: File){
    if(this.isImagem(file)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = this.sanitizer.bypassSecurityTrustUrl(reader.result.toString());
        this.srcList.push(url);
      };
      reader.readAsDataURL(file);
    }
  }

}
