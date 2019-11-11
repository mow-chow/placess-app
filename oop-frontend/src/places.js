class Place {
    constructor(placeObj){
      this.id = placeObj.id
      this.name = placeObj.name
      this.comments = placeObj.comments
    }
  
    render(){
      return(`<li class='place' data-id='${this.id}'>${this.name}</li>`)
    }
  }