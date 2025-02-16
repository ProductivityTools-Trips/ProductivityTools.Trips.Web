import { executeInTheNextEventLoopTick } from '@mui/x-date-pickers/internals';
import { useState } from 'react';
import { useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';


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


        // const addExpense = (expense) => {
        //     for (var i = 0; i < pieValues.length; i++) {
        //         if (pieValues[i].id == expense.categoryName) {
                    
        //         }
        //     }
        // }

        // props && props.expenses && props.expenses.forEach(expense => {
        //     console.log(expense);

        // })

        const addCategories = (pieValues) => {
            let categories = []
            props && props.expenses && props.expenses.forEach(expense => {
                if (expense.checked && categories.indexOf(expense.categoryName) == -1) {
                    categories.push(expense.categoryName)
                }
            })

            categories.forEach(category => {
                let x = { 'id': category, dataPoints: [], value: 0, 'label': category }
                pieValues = [...pieValues, x];
            })
            return pieValues;
        }

        let pieValues = [];// = pieData
        pieValues = addCategories(pieValues);
        debugger;
        console.log(props.expenses && props.expenses);
        props && props.expenses && props.expenses.forEach(expense => {
            if (expense.checked) {

                for (var i = 0; i < pieValues.length; i++) {
                    if (pieValues[i].id == expense.categoryName) {
                        pieValues[i].value+=expense.expensedInPln;

                        // let updated = false;
                        // pieValues[i].dataPoints.forEach(e => {
                        //     if (e.x == (new Date(expense.date).getDate())) {
                        //         if (pieValues[i].category == expense.categoryName) {
                        //             e.y = e.y + expense.valuePln;
                        //             updated = true;
                        //         }
                        //     }
                        // })

                        // if (updated == false) {
                        //     if (pieValues[i].category == expense.categoryName) {
                        //         pieValues[i].dataPoints = [...pieValues[i].dataPoints, { x: (new Date(expense.date)).getDate(), y: expense.value }]
                        //     }
                        //     else {
                        //         pieValues[i].dataPoints = [...pieValues[i].dataPoints, { x: (new Date(expense.date)).getDate(), y: 0 }]

                        //     }
                        // }
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
            <div>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
                <PieChart
                    series={[
                        {
                            data: pieData
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </div>
        </div>
    )
}

export default BarChart;