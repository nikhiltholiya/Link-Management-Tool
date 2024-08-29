import ReactApexChart from "react-apexcharts";

const DonutChart = ({ data, label }: { data: any; label: any }) => {
   const options: any = {
      chart: {
         type: "donut",
      },
      plotOptions: {
         pie: {
            startAngle: -90,
            endAngle: 270,
         },
      },
      dataLabels: {
         enabled: false,
      },
      fill: {
         type: "gradient",
      },
      horizontalAlign: "start",
      labels: label,
      legend: { position: "left" },
      responsive: [
         {
            breakpoint: 1280,
            options: { chart: { height: 320 } },
         },
         {
            breakpoint: 768,
            options: { chart: { height: 260 } },
         },
      ],
   };

   return (
      <div id="chart" className="donut-chart">
         <ReactApexChart
            options={options}
            series={data}
            type="donut"
            height={320}
         />
      </div>
   );
};

export default DonutChart;
