

import { ComponentProps } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

type Props = {
  data: ComponentProps<typeof PieChart>['data'];
};

function PieChartSingle({ data }: Props) {

  return (

    <PieChart
      data={data}
      totalValue={100}
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