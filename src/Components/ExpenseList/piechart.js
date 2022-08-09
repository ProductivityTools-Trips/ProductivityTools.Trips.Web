import { useState } from 'react';
import { useEffect } from 'react';
import { XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis, VerticalGridLines, VerticalBarSeries } from 'react-vis';


function PieChart(props) {

    const [pieData, setPieData] = useState({ 'food': [{ x: 2, y: 4 }, { x: 3, y: 6 }],
    'sleep': [{ x: 2, y: 4 }, { x: 3, y: 6 }] });

    console.log("piedata");
    console.log(pieData)

    useEffect(() => {
        //food row //x=day=2, y=food,x=day=3, y=food
        //sleep row //x=day=2, y=sleep, x=day=3

        const findCategory = (element) => {
            debugger;
            for (var i = 0; i < pieData.length; i++) {
                debugger;
                console.log("findcategory");
                console.log(pieData[i]);
            }
            return null;
        }

console.log("df")
    /  //  console.log(props && props.expenses && props.expenses.length);
    ///    console.log(pieData.length);
        props && props.expenses && props.expenses.forEach(element => {
            let x = findCategory(element);
            if (x == null) {
                let newElement = { x: 2, y: element.expensed }
                let pd = pieData;
              //  pd.push(newElement);
               

            }
            else {
                //update element
                //set state
            }
            // if (arrayContains(element) == false) {
            //     array.push({ x: new Date(element.date), y: element.dayExpensedInPln });
            }
        );
        //console.log(pieData);

    }, [])

    return (
        <div>
            <span>PieChart</span>
            <div>
                <XYPlot width={300} height={300} stackBy="y">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={pieData["food"]}  />
                    <VerticalBarSeries data={pieData["sleep"]} />
                </XYPlot>
            </div>
        </div>
    )
}

export default PieChart;