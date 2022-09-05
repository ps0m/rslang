import { ComponentProps } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

type Props = {
  data: ComponentProps<typeof PieChart>['data'];
  totalValue?: number
};

function PieChartSingle({ data, totalValue }: Props) {

  return (

    <PieChart
      data={data}
      totalValue={totalValue ? totalValue : 100}
      lineWidth={20}
      label={({ dataEntry }) => dataEntry.value}
      labelStyle={{
        fontSize: '25px',
        fontFamily: '"Balsamiq Sans", sans-serif',
        fill: '#E38627',
      }}
      labelPosition={0}
      animate
    />

  );
}

export default PieChartSingle;