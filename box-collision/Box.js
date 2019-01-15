class Box{
    constructor(x,mass,radius,v,displayX=0){
        this.x = x;
        this.mass = mass;
        this.radius = radius;
        this.v = v;
        this.displayX = this.x;
    }

    display(x){
        fill(255);
        rect(x,window.innerHeight/2,this.radius,this.radius);
    }

    step(){
        this.x += this.v;
    }

    collide(m1,v1){
        var m2 = this.mass;
        var v2 = this.v;
        var v2f = (2*m1*v1)/(m1+m2)-(v2*(m1-m2))/(m1+m2);
        this.v = v2f;
    }

    wallBump(){
        this.v = -this.v;
    }
}