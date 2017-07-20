import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: [ './heatmap.component.css' ]
})
export class HeatmapComponent implements OnInit{
//   constructor(private heroService: HeroService) { }
  _x = [];
  _y = [];
  my_data = [];
  echartsInstance = null;

  onChartInit(ec) {
      this.echartsInstance = ec;
  }

  getRandomData(x:number,y:number){
    let random_data = new Array();
    for(let i = 0; i < x; i++) {
        for(let j = 0; j < y; j++) {
            random_data[i*x+j] = [i,j,Math.floor((Math.random()*10))];
        }

    }
    return random_data;
  }

  ngOnInit(): void {
    // this.heroService.getHeroes()
    //   .then(heroes => this.heroes = heroes.slice(1, 5));
    let data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],
        [0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],
        [0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],
        [1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],
        [1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],
        [1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],
        [2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],
        [2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],
        [3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],
        [3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],
        [4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],
        [4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],
        [5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],
        [5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],
        [5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],
        [6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],
        [6,22,2],[6,23,6]];
    for (let i = 0; i < 70; i++) {
      // console.log(i);
      this._x.push(i+1);
    }

    for(let j = 0; j < 70; j++) {
      this._y.push(j+1);
    }

    this.my_data = data.map(function (item) {
      return [item[1], item[0], item[2] || '-'];
    });

    
    let test_data = this.getRandomData(60,60);
    this.chartOption.series[0].data = test_data;
    console.log(test_data);
    setInterval(()=>{
        console.log("random starts");
        // this.chartOption.series[0].data = this.getRandomData(20,20);
        this.echartsInstance.setOption({
        series: [{
            // type: 'heatmap',
            data: this.getRandomData(50,60)
        }]
        });
        console.log("random ends");
    },5000);
    
  }


//   addData(): void{
//      for()
//   }


  chartOption = {
    tooltip: {
        position: 'top'
    },
    animation: false,
    grid: {
        bottom: '10px',
        top: '10px',
        left: '10px',
        right: '10px'
    },
    xAxis: {
        type: 'category',
        data: this._x,
        splitArea: {
            show: true
        },
    },
    yAxis: {
        type: 'category',
        data: this._y,
        splitArea: {
            show: true
        },
        inverse: true
    },
    visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '0%',
        inRange: {
            color: ['#e7f2f9','#abd9e9','#74add1','#4575b4','#313695'],
        }
    },
    series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: this.my_data,
        label: {
            normal: {
                show: true
            }
        },
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
  };
  
}
