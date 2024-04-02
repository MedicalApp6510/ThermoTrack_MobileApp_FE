import React from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useTheme} from "react-native-paper";

const LineChartComponent = ({data}) => {

  function formatDate(timestamp) {
    const months = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };

    const parts = timestamp.split(' ');
    const month = months[parts[0]];
    const day = parts[1].replace(',', '').padStart(2, '0'); // Remove comma and ensure two digits

    return `${month}/${day}`;
  }


  const originalLabels = data.map(item => formatDate(item.timestamp));
  const labels = originalLabels.filter((item, index) => index % 1 === 0).reverse();
  const temperatures = data.map(item => parseFloat(item.temperature)).reverse();

  const chartData = {
    labels: labels,
    datasets: [{data: temperatures}],
  };
  const {colors} = useTheme();

  const chartWidth = labels.length * 50;
  const screenWidth = Dimensions.get("window").width;
  const dynamicWidth = chartWidth > screenWidth ? chartWidth : screenWidth;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <LineChart
        data={chartData}
        // width={Dimensions.get("window").width }

        height={320}
        width={dynamicWidth}

        chartConfig={{
          backgroundColor: colors.background,
          backgroundGradientFrom: colors.background,
          backgroundGradientTo: colors.primary,
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: colors.primary,
          },
        }}
        bezier
      />
    </ScrollView>

  );
};

export default LineChartComponent;
