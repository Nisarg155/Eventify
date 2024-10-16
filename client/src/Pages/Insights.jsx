import {BarChart} from "@mui/x-charts/BarChart";

const Insights = (props) => {
    // eslint-disable-next-line react/prop-types
    // const registered = props.registered
    // // eslint-disable-next-line react/prop-types
    // const accepted = new Set(props.accepted);
    // const branches = new Set();
    // // eslint-disable-next-line react/prop-types
    // const groupedData = registered.reduce((acc, attendee) => {
    //     const sem = attendee.sem;
    //     const branch = attendee.branch;
    //
    //     branches.add(branch);
    //
    //     if(!accepted.has(attendee.email)) return acc;
    //     if (!acc[sem]) {
    //         acc[sem] = {};
    //     }
    //
    //     if (!acc[sem][branch]) {
    //         acc[sem][branch] = 0;
    //     }
    //
    //     acc[sem][branch]++;
    //     return acc;
    // }, {});
    //
    //
    //
    // const chartData = [];
    // for (const sem in groupedData) {
    //     const semData = [];
    //     for (const branch in groupedData[sem]) {
    //         semData.push(groupedData[sem][branch]);
    //     }
    //     chartData.push(semData);
    // }
    // console.log(groupedData)
    // const semValues = Object.keys(groupedData);
    //
    // console.log(chartData);
    // return (
    //     <>
    //         <BarChart
    //             xAxis={[{ scaleType: 'band', data: semValues }]}
    //             series={chartData.map((data, index) => ({
    //                 data,
    //                 label: `Branch ${index + 1}` // Adjust label as needed
    //             }))}
    //             width={1000}
    //             height={300}
    //         />
    //     </>
    // )
}

export default Insights