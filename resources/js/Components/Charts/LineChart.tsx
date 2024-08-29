import ReactApexChart from "react-apexcharts";

interface Props {
   height: number;
   label: string[];
   data: [{ name: string; data: any }];
}

const LineChart = (props: Props) => {
   const options: any = {
      chart: {
         height: 300,
         type: "area",
         toolbar: {
            show: false,
         },
      },
      dataLabels: {
         enabled: false,
      },
      stroke: {
         curve: "smooth",
      },
      xaxis: {
         categories: props.label,
      },
      yaxis: {
         min: 0,
         tickAmount: 5,
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
            right: 8,
            bottom: 0,
            left: 10,
         },
      },
      tooltip: {
         x: {
            format: "dd/MM/yy HH:mm",
         },
      },
   };

   return (
      <div id="chart">
         <ReactApexChart
            type="area"
            options={options}
            series={props.data}
            height={props.height}
         />
      </div>
   );
};

export default LineChart;
