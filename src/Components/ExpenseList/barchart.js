import { executeInTheNextEventLoopTick } from '@mui/x-date-pickers/internals';
import { useState } from 'react';
import { useEffect } from 'react';
import { XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis, VerticalGridLines, DiscreteColorLegend, VerticalBarSeries } from 'react-vis';


function BarChart(props) {

    // const [pieData, setPieData] = useState({ 'food': [{ x: 2, y: 4 }, { x: 3, y: 6 }],
    // 'sleep': [{ x: 2, y: 4 }, { x: 3, y: 6 }] });


    const [pieData, setPieData] = useState(
        [
            {
                'category': 'Empty',
                'dataPoints':
                    [
                        { x: 'a', y: 1 },
                        // { x: 2, y: 1 }
                    ]
            },

            // {
            //     'category': 'Sleep',
            //     'dataPoints':
            //         [
            //             { x: 1, y: 1 },
            //              { x: 2, y: 1 }
            //         ]
            // },

            // {
            //     'category': 'Fun',
            //     'dataPoints':
            //         [
            //             { x: 1, y: 1 },
            //             { x: 2, y: 1 },
            //             { x: 3, y: 1 },

            //         ]
            // }
        ]
    )
    console.log("piedata");
    console.log(pieData)

    useEffect(() => {
        const addCategories = (pieValues) => {
            let categories = []
            props && props.expenses && props.expenses.forEach(expense => {
                if (expense.checked && categories.indexOf(expense.categoryName) == -1) {
                    categories.push(expense.categoryName)
                }
            })

            categories.forEach(category => {
                let x = { 'category': category, dataPoints: [] }
                pieValues = [...pieValues, x];
            })
            return pieValues;
        }
        let pieValues = [];// = pieData
        pieValues = addCategories(pieValues);
        console.log(props.expenses && props.expenses);
        props && props.expenses && props.expenses.forEach(expense => {
            if (expense.checked) {
                for (var i = 0; i < pieValues.length; i++) {
                    if (pieValues[i].category == expense.categoryName) {
                        let updated = false;
                        pieValues[i].dataPoints.forEach(e => {
                            if (e.x == (new Date(expense.date).getDate())) {
                                if (pieValues[i].category == expense.categoryName) {
                                    e.y = e.y + expense.valuePln;
                                    updated = true;
                                }
                            }
                        })

                        if (updated == false) {
                            if (pieValues[i].category == expense.categoryName) {
                                pieValues[i].dataPoints = [...pieValues[i].dataPoints, { x: (new Date(expense.date)).getDate(), y: expense.value }]
                            }
                            else {
                                pieValues[i].dataPoints = [...pieValues[i].dataPoints, { x: (new Date(expense.date)).getDate(), y: 0 }]

                            }
                        }
                    }
                }
            }
        }
        );
        console.log(pieValues);
        setPieData(pieValues);

    }, [props.expenses])

    return (
        <div>
            <span>BarChart - Daily Value in Pln</span>
            {/* <div style={{ width: '1300px', border: '1px solid black' }}> */}
            <div style={{ border: '1px solid black' }}>
                <div style={{ width: "200px", border: "1px solid red", float: "left" }}>
                    <DiscreteColorLegend
                        width={180}
                        items={pieData.map(x => x.category)}
                    />
                </div>
                <div style={{ width: "300px", border: "1px solid red", overflow: "hidden" }}>
                    <XYPlot width={300} height={300} xType="ordinal"
                        stackBy="y"
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        {pieData.map(e => {
                            return (<VerticalBarSeries data={e.dataPoints} />)
                        })}
                        {/* <VerticalBarSeries cluster="2015" data={[
                        { x: 'Q1', y: 3 },
                        { x: 'Q2', y: 8 },
                        { x: 'Q3', y: 11 },
                        { x: 'Q4', y: 19 }
                    ]} />
                    <VerticalBarSeries cluster="2015" data={[
                        { x: 'Q1', y: 3 },
                        { x: 'Q2', y: 8 },
                        { x: 'Q3', y: 11 },
                        { x: 'Q4', y: 19 }
                    ]} /> */}
                        {/* <VerticalBarSeries data={pieData[1].dataPoints} /> */}
                    </XYPlot>
                </div>
            </div>
        </div>
    )
}

export default BarChart;