import '../../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis, VerticalGridLines } from 'react-vis';
import { useEffect, useState } from 'react';

function Chart(props) {
    const [d, setd] = useState([]);
    useEffect(() => {

        let array = [];

        const arrayContains = (element) => {
            for (var i = 0; i < array.length; i++) {
                if (array[i].x.toDateString() == new Date(element.date).toDateString()) { return true }
            }
            return false;
        }


        props && props.expenses && props.expenses.forEach(element => {
            if (element.categoryName != 'Sleep') {
                if (arrayContains(element) == false) {
                    array.push({ x: new Date(element.date), y: element.dayExpensedInPln });
                }
            }
        });

        setd(array);
    }, [props.expenses])

    const data = [
        { x: new Date('2021.01.01'), y: 9 },
        { x: new Date('2021.01.02'), y: 5 },
        { x: new Date('2021.01.03'), y: 4 },
        { x: new Date('2021.01.04'), y: 9 },

    ];
    return (
        <div>
            <XYPlot
                xType="time"
                width={1000}
                height={300}>
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis title="X Axis" />
                <YAxis title="Y Axis" />
                <LineSeries data={data} />
            </XYPlot>
            <XYPlot height={300} width={1000} xType="time" >
                <HorizontalGridLines />
                <VerticalGridLines />
                <LineSeries data={d} />
                <XAxis title="X Axis" />
                <YAxis title="Y Axis" />
            </XYPlot>
        </div>



    )
}

export default Chart;