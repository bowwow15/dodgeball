class Bullet {
  constructor () {

  }

  draw (bullet_from_server, id) {
    let x = bullet_from_server.x + view.get().x;
    let y = bullet_from_server.y + view.get().y;
    let x_velocity = bullet_from_server.x_velocity * bullet_from_server.speed;
    let y_velocity = bullet_from_server.y_velocity * bullet_from_server.speed;
    let lastX = bullet_from_server.lastX + view.get().x;
    let lastY = bullet_from_server.lastY + view.get().y;

    ctx.fillStyle = "black";
    ctx.strokeStyle = "rgba(0,0,0,0.7)";

    //draw trail of bullet
    ctx.lineWidth = bullet_from_server.size;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    //draw bullet
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
}

var bullet = new Bullet();
