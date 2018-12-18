var Context = {
  context: null,
  canvas: null,

  create: function (canvas_tag_id) {
    this.canvas = document.getElementById(canvas_tag_id);
    this.context = this.canvas.getContext('2d');
  }
}

Context.create("canvas");
var ctx = Context.context;

function resizeWindow () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
} resizeWindow();
