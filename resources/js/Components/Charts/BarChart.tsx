import ReactApexChart from "react-apexcharts";

const BarChart = ({ data, label }: { data: any; label: any }) => {
   const series = [{ data: data }];

   const options: any = {
      chart: {
         toolbar: {
            show: false,
         },
      },
      stroke: {
         curve: "smooth",
         width: 2,
      },
      xaxis: {
         categories: label,
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
            top: 20,
            right: 20,
            bottom: 0,
            left: 10,
         },
      },
      legend: {
         position: "top",
         horizontalAlign: "right",
      },
      responsive: [
         {
            breakpoint: 1280,
            options: { chart: { height: 400 } },
         },
         {
            breakpoint: 1024,
            options: { chart: { height: 350 } },
         },
         {
            breakpoint: 768,
            options: {
               chart: { height: 300 },
               grid: { padding: { top: 0 } },
               legend: { horizontalAlign: "left" },
            },
         },
      ],
   };

   return (
      <div id="chart">
         <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={400}
         />
      </div>
   );
};

export default BarChart;
