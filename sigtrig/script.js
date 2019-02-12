// Load Cookies
var c = decodeURIComponent(document.cookie);
c = c.substring(2,c.length);
try{
    var dps = JSON.parse(c);
}
catch{
    var dps = []
}
// Initialize Graph
var xVal = dps.length+1;
var yVal = 100; 
var dataLength = 20; // number of dataPoints visible at any point

var chart = new CanvasJS.Chart("chartContainer", {
    title :{
        text: "Dynamic Data"
    },
    axisY: {
        includeZero: true
    },      
    data: [{
        type: "line",
        dataPoints: dps
    }]
});

function updateChart(t){
    dps.push({
        x: xVal,
        y: t
    });
    xVal++;

    chart.render();
};

// Initialize Problem
var t0, t1 = 0;
function del(){
    dps.pop();
    chart.render();

    document.cookie = "a="+JSON.stringify(dps)
    t0, t1 = 0;
    xVal--;
}
function generateProblem(problemType){
    t0 = performance.now();
    if(problemType == "add simple"){
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
        answer = num1 + num2;
        text = "" + num1 + " + " + num2 + "";
        document.getElementById("question").innerHTML = text;
        return answer
    }
    if(problemType == "cos"){
        num1 = Math.floor(Math.random() * 90)
        answer = Math.cos(num1 * Math.PI / 180)
        text = "cos(" + num1 + ")";
        document.getElementById("question").innerHTML = text;
        return answer
    }
}

var problemList = ["add simple","cos"];
var sigDifference = 0.015;
// var problemType = problemList[Math.floor(Math.random() * problemList.length)]
var problemType = problemList[1];
answer = generateProblem(problemType);

var input = document.getElementById("myInput");

function ev() {
    var x = parseFloat(input.value);
    var feedback = "";
    if(x > answer){
        feedback = "That's a bit too high."
    }
    else if(x < answer){
        feedback = "That's a bit too low."
    }
    else{
        feedback = "perfect!"
    }

    if(x - answer < sigDifference){
        t1 = performance.now();
        timeTaken = ((t1-t0)/1000).toFixed(1);

        percentError = parseFloat(100*Math.abs(x-answer)/answer).toFixed(2)
        // console.log(100*(Math.abs(x-answer)/answer))
        document.getElementById("correct answer").innerHTML = feedback + "<br/> Correct! Off by: <b>" + percentError+"%</b>" + "<br/> Time taken: <b>" + timeTaken + " s</b>";
        document.getElementById("myInput").value = "";

        updateChart(parseFloat(timeTaken));
        generateProblem(problemType);

        document.cookie = "a="+JSON.stringify(dps)
    }
    else{
        document.getElementById("correct answer").innerHTML = feedback + "<br/> Incorrect!<br/>";
    }
}

// Event Listener
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        ev();
    }
});

chart.render();

var elt = document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt);
calculator.updateSettings({degreeMode:true})
calculator.setMathBounds({
    left: 0,
    right: 95,
    bottom: -0.01,
    top: 1.01,
});
calculator.setExpression({id:'reference', latex:'\\cos\(x\)'});
calculator.setExpression({id:'0-10', latex:'y=1\\left\\{0<x<10\\right\\}'})
calculator.setExpression({id:'10-20', latex:'\\frac{104-\\frac{1}{2}x}{100}\\left\\{10<x<20\\right\\}'});
calculator.setExpression({id:'20-50',latex:'\\frac{115-x}{100}\\left\\{20<x<50\\right\\}'})
calculator.setExpression({id:'50-75',latex:'\\frac{140-1.5x}{100}\\left\\{50<x<75\\right\\}'})
calculator.setExpression({id:'75-90',latex:'\\frac{137-1.5x}{100}\\left\\{75<x<90\\right\\}'})