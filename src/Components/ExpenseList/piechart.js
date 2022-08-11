import { useState } from 'react';
import { useEffect } from 'react';
import { XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis, VerticalGridLines, VerticalBarSeries } from 'react-vis';


function PieChart(props) {

    // const [pieData, setPieData] = useState({ 'food': [{ x: 2, y: 4 }, { x: 3, y: 6 }],
    // 'sleep': [{ x: 2, y: 4 }, { x: 3, y: 6 }] });


    const [pieData, setPieData] = useState(
        [
            {
                'category': 'food', 
                'elements': 
                [
                    { x: 2, y: 4 }, 
                    { x: 3, y: 6 }
                ]
            },
      
            {
                'category': 'sleep', 
                'elements': 
                [
                    { x: 2, y: 4 }, 
                    { x: 3, y: 10 }
                ]
            }
        ]
    )
    console.log("piedata");
    console.log(pieData)

    useEffect(() => {
        //food row //x=day=2, y=food,x=day=3, y=food
        //sleep row //x=day=2, y=sleep, x=day=3

        const findCategory = (category) => {
            debugger;
            for (var i = 0; i < pieData.length; i++) {
                debugger;
                console.log("findcategory");
                console.log(pieData[i]);
                if (pieData[i].category==category)
                {
                    return pieData[i];
                }
            }
            return null;
        }

        console.log("df")
        console.log(props.expenses && props.expenses);
        props && props.expenses && props.expenses.forEach(element => {
            console.log("debugger")
            debugger;
            let x = findCategory(element.category);
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

    }, [props.expenses])

    return (
        <div>
            <span>PieChart</span>
            <div>
                <XYPlot width={300} height={300} stackBy="y">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={pieData[0].elements}  />
                    <VerticalBarSeries data={pieData[1].elements} />
                </XYPlot>
            </div>
        </div>
    )
}

export default PieChart;