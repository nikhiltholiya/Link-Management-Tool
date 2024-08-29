import ReactApexChart from "react-apexcharts";

interface Props {
   height: number;
   data: [{ name: string; data: any }];
}

const AreaChart = (props: Props) => {
   const barOption: any = {
      chart: {
         type: "bar",
         toolbar: {
            show: false,
         },
      },
      dataLabels: {
         enabled: false,
      },
      xaxis: {
         categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
         ],
      },
      grid: {
         xaxis: {
            lines: {
               show: false,
            },
         },
         yaxis: {
            lines: {
               show: false,
            },
         },
         padding: {
            top: 0,
            right: 16,
            bottom: 0,
            left: 12,
         },
      },
   };

   return (
      <div id="chart">
         <ReactApexChart
            type="area"
            options={barOption}
            series={props.data}
            height={props.height}
         />
      </div>
   );
};

export default AreaChart;
