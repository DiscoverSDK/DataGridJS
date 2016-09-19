import {Resource} from './resource';

export class App {
  constructor() {
    this.heading = "Todos";
    this.resources = [{'ResourceAddress': 'http://www.discoversdk.com', 'ResourceDescription':'Great site'}];;
    this.description = '';
    this.url = '';
  }

  addResource() {
    if (this.description && this.url) {
      this.resources.push(new Resource(this.description, this.url));
      this.description = '';
      this.url = '';
    }
  }

  removeResource(resource) {
    let index = this.resources.indexOf(resource);
    if (index !== -1) {
      this.resources.splice(index, 1);
    }
  }

  showResource(){
    alert(JSON.stringify(this.resources));
  }
}