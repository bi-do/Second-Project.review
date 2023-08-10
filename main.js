let underbar = document.getElementById("under-bar");

let selectline = document.querySelectorAll(".select-line div");

let inputbox = document.getElementById("input-box");

let inputbutton = document.getElementById("input-button");

let taskarray = [];

let mode = "all";

let modebox = [];

let alllist = "";

let select = Array.from(selectline);

select.forEach((menu) => menu.addEventListener("click", (e) => eventbox(e)));

inputbutton.addEventListener("click", taskin);

function eventbox(e) {
  undermove(e);
  modechange(e);
}

// for (let a = 0; a < selectline.length; a++) {
//   selectline[a].addEventListener("click", function (event) {
//     modechange(event);
//   });
// }

function undermove(e) {
  underbar.style.left = e.currentTarget.offsetLeft + "px";
  underbar.style.width = e.currentTarget.offsetWidth + "px";
  underbar.style.bottom = e.currentTarget.offsetTop + "px";
}

function newid() {
  return Math.random().toString(36).substr(2, 16);
}

function taskin() {
  let userinput = inputbox.value;

  let taskobject = {
    id: newid(),
    usertask: userinput,
    iscomplet: false,
  };
  taskarray.push(taskobject);

  render();
}

function render() {
  let resulthtml = "";

  if (mode == "all") {
    alllist = taskarray;
  } else if (mode == "ing" || mode == "complete") {
    alllist = modebox;
  }
  for (let i = 0; i < alllist.length; i++) {
    if (alllist[i].iscomplet == true) {
      resulthtml += `<div class="task-line">
            <div class = "task-text text-box">${alllist[i].usertask}</div>
            <div class = "button-zone">
              <button onclick = "checkit('${alllist[i].id}')"><i class="fa-solid fa-check"></i></button>
              <button onclick = "deleteb('${alllist[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>`;
    } else if (alllist[i].iscomplet == false) {
      resulthtml += `<div class="task-line">
    <div class = "text-box">${alllist[i].usertask}</div>
    <div class = "button-zone">
      <button onclick = "checkit('${alllist[i].id}')"><i class="fa-solid fa-check"></i></button>
      <button onclick = "deleteb('${alllist[i].id}')"><i class="fa-solid fa-trash"></i></button>
    </div>
  </div>`;
    }
  }

  document.getElementById("task-box").innerHTML = resulthtml;
}

function checkit(id) {
  for (let e = 0; e < taskarray.length; e++) {
    if (alllist[e].id == id) {
      alllist[e].iscomplet = !alllist[e].iscomplet;
      break;
    }
  }

  render();
  console.log("돼는중");
}

function deleteb(id) {
  for (let c = 0; c < taskarray.length; c++) {
    if (taskarray[c].id == id) {
      taskarray.splice(c, 1);
      break;
    }
  }
  for (let c = 0; c < modebox.length; c++) {
    if (modebox[c].id == id) {
      modebox.splice(c, 1);
      break;
    }
  }
  render();
}
function modechange(e) {
  mode = e.target.id;

  modebox = [];

  if (mode == "all") {
    render();
  } else if (mode == "ing") {
    for (let d = 0; d < taskarray.length; d++) {
      if (taskarray[d].iscomplet == false) {
        modebox.push(taskarray[d]);
      }
    }
    render();
  } else if (mode == "complete") {
    for (let d = 0; d < taskarray.length; d++) {
      if (taskarray[d].iscomplet == true) {
        modebox.push(taskarray[d]);
      }
    }
    render();
  }
}
