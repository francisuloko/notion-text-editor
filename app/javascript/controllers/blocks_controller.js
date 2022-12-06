import { Controller } from "@hotwired/stimulus"

let block = {entry: "", format: ""}
let display = document.getElementById("display")
const csrfToken = document.querySelector("[name='csrf-token']").content
const inp = document.getElementById("entry")

export default class extends Controller {
  static targets = ["entry", "command", "format"]

  addBlock(block) {
    const div = document.createElement("div")
    const span = document.createElement("div")
    const button = document.createElement("button")

    div.setAttribute("class", "flex justify-between items-center")

    span.setAttribute("data-controller", "blocks");
    span.setAttribute("data-action", "keyup->blocks#edit");
    span.setAttribute("data-id", `${block.id}`);
    span.setAttribute("contenteditable", "");
    span.setAttribute("class", `${block.format}`);
    span.innerHTML = block.entry

    button.setAttribute("data-value", `${block.id}`);
    button.setAttribute("data-action", "blocks#delete");
    button.innerHTML = "del"

    div.append(span)
    display.appendChild(div)
  }

  async display() {
    display.innerHTML = ""
    const blocks = await fetch("/blocks")
    .then(response => response.json())
    .then(data => data);

    for(let block of blocks) {
      this.addBlock(block)
    }
  }

  add(e) {
    if (block.format == "/") { 
      inp.classList.add(`${block.format}`)
    }
    
    
    if(e.key=="Enter") {
      block.entry = inp.value;
      inp.removeAttribute("class")
      inp.placeholder = "Type / to format"
      fetch(`/add`, {
        method: "post",
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(block)
      })
      .then(response => response.json())
      .then(data => data)

      this.addBlock(block)
      inp.value = ""
      block.format = ""
    }
  }

  showCommands() {
    let entry = this.entryTarget;
    let command = this.commandTarget.classList;

    if(entry.value == "/") {
      command.remove("hide");
    } else {
      command.add("hide");
    }
  }

  format(e) {
    e.preventDefault();
    block.format = e.target.dataset.value;
    inp.placeholder = "Heading 1"
    this.commandTarget.classList.add("hide");
    this.entryTarget.classList.add(block.format);
    this.entryTarget.value = "";
    this.entryTarget.focus();
  }

  edit() {
    inp.style.visibility = "hidden";
    let object = {
      entry: this.element.innerHTML,
      format: this.element.dataset.format,
      id: this.element.dataset.id
    }

    fetch(`/edit/${object.id}`, {
      method: "put",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify(object)
    })
    .then(response => response.json())
    .then(data => data)
  }

  delete(e) {
    e.preventDefault();
    let id = e.target.dataset.value;
    display.removeChild(e.target.parentNode)
    fetch(`/delete/${id}`, {
      method: "delete",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
      },
    })
    .then(response => response.json())
    .then(data => data)
  }

  clickEdit() {
    inp.style.visibility = "visible";
    inp.focus();
  }
}
