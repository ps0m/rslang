import { ComponentProps, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

type Props = {
  data: ComponentProps<typeof PieChart>['data'];
};

function PieChartInterest(props: Props) {
  const [hovered, setHovered] = useState<number | undefined>(undefined);

  const data = props.data.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: 'grey',
      };
    }

    return entry;
  });

  const lineWidth = 60;

  return (
    <PieChart
      style={{
        fontFamily:
          '"Balsamiq Sans", sans-serif',
        fontSize: '8px',
      }}
      data={data}
      radius={PieChart.defaultProps.radius - 6}
      lineWidth={60}
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      segmentsShift={1}
      animate
      label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
      labelPosition={100 - lineWidth / 2}
      labelStyle={{
        fill: '#fff',
        opacity: 0.75,
        pointerEvents: 'none',
      }}
      onMouseOver={(_, index) => {
        setHovered(index);
      }}
      onMouseOut={() => {
        setHovered(undefined);
      }}
    />
  );
}

export default PieChartInterest;