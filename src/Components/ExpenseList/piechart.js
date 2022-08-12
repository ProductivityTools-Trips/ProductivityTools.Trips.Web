import { executeInTheNextEventLoopTick } from '@mui/x-date-pickers/internals';
import { useState } from 'react';
import { useEffect } from 'react';
import { XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis, VerticalGridLines, VerticalBarSeries } from 'react-vis';


function PieChart(props) {

    // const [pieData, setPieData] = useState({ 'food': [{ x: 2, y: 4 }, { x: 3, y: 6 }],
    // 'sleep': [{ x: 2, y: 4 }, { x: 3, y: 6 }] });


    const [pieData, setPieData] = useState(
        [
            {
                'category': 'Food',
                'dataPoints':
                    [
                        { x: 1, y: 1 },
                        { x: 2, y: 1 }
                    ]
            },

            {
                'category': 'Sleep',
                'dataPoints':
                    [
                        { x: 1, y: 1 },
                        { x: 2, y: 1 }
                    ]
            },

            {
                'category': 'Fun',
                'dataPoints':
                    [
                        { x: 1, y: 1 },
                        { x: 2, y: 1 },
                        { x: 3, y: 1 },

                    ]
            }
        ]
    )
    console.log("piedata");
    console.log(pieData)

    useEffect(() => {
        //food row //x=day=2, y=food,x=day=3, y=food
        //sleep row //x=day=2, y=sleep, x=day=3

        const findCategory = (pieValues, category) => {
            for (var i = 0; i < pieValues.length; i++) {
                console.log("findcategory");
                console.log(pieData[i]);
                if (pieValues[i].category == category) {
                    return pieValues[i];
                }
            }
            return null;
        }

        console.log("df")
        console.log(props.expenses && props.expenses);
        props && props.expenses && props.expenses.forEach(expense => {
            debugger;
            let pieValues = pieData
            let x = findCategory(pieValues, expense.categoryName);
            console.log("debugger")
            console.log(x);
            console.log(expense);
            if (x == null) {
                x = { 'category': expense.categoryName, dataPoints: [] }
                pieValues = [...pieValues, x];


            }
            let updated = false;
            x.dataPoints.forEach(e => {
                debugger;
                if (e.x == (new Date(expense.date).getDate())) {
                    e.y = e.y + expense.value;
                    updated = true;
                }
            })
            if (updated == false) {
                x.dataPoints = [...x.dataPoints, { x: (new Date(expense.date)).getDate(), y: expense.value }]
            }

            setPieData(pieValues);
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
                <XYPlot width={300} height={300} stackBy="y" >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    {pieData.map(e => {
                        return (<VerticalBarSeries data={e.dataPoints} />)
                    })}
                    {/* <VerticalBarSeries data={pieData[0].dataPoints} />
                    <VerticalBarSeries data={pieData[1].dataPoints} /> */}
                </XYPlot>
            </div>
        </div>
    )
}

export default PieChart;