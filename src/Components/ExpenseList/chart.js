import '../../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis, VerticalGridLines } from 'react-vis';

function Chart() {
    const data = [
        { x: new Date('2021.01.01'), y: 8 },
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
            <XYPlot height={300} width={300} >
                <HorizontalGridLines />
                <VerticalGridLines />
                <LineSeries data={data} />
                <XAxis title="X Axis" />
                <YAxis title="Y Axis" />
            </XYPlot>
        </div>



    )
}

export default Chart;