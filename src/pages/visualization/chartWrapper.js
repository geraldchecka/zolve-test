import React from "react";
import { Bar } from 'react-chartjs-2';
import { array, node } from "prop-types";

// prepare labels and datasets[0].data
function dataFormatter(_data) {
  let datasets = _data.reduce(function(acc, item) {
    acc.labels.push(item.name);
    acc.data.push(item.count);
    return acc;
  }, {
    labels: [],
    data: []
  });

  return datasets;
}

function ChartWrapper(props) {
  let formattedData = dataFormatter(props.data);

  const data = {
    labels: formattedData.labels,
    datasets: [
      {
        label: 'Library Usage',
        data: formattedData.data,
        borderWidth: 1,
      },
    ],
  }
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return <Bar data={data} options={options}/>;
}
ChartWrapper.propTypes = {
  results: array,
};
ChartWrapper.defaultProps = {
  results: []
};

export default ChartWrapper;