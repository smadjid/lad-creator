import React from "react";

const genericProps = (attr) => {
  return {
    id: 0,
    datasource: null,
    fieldConfig: {
      defaults: {
        color: {
          mode: "palette-classic",
        },
        custom: {
          axisLabel: "",
          axisPlacement: "auto",
          axisSoftMin: 0,
          fillOpacity: 80,
          gradientMode: "none",
          hideFrom: {
            legend: false,
            tooltip: false,
            viz: false,
          },
          lineWidth: 1,
        },
        mappings: [],
        thresholds: {
          mode: "absolute",
          steps: [
            {
              color: "green",
              value: null,
            },
            {
              color: "red",
              value: 80,
            },
          ],
        },
      },
      overrides: [],
    },
    gridPos: {
      h: 9,
      w: 12,
      x: 0,
      y: 0,
    },
  };
};

const BarChart = (attr) => {
  return {
    type: "barchart",
    title: "My Barchart",
    options: {
      barWidth: 0.97,
      groupWidth: 0.7,
      legend: {
        calcs: [],
        displayMode: "list",
        placement: "bottom",
      },
      orientation: "auto",
      showValue: "auto",
      text: {},
      tooltip: {
        mode: "single",
      },
    },
    targets: [
        {
          format: "time_series",
          group: [],
          metricColumn: "none",
          queryType: "randomWalk",
          rawQuery: false,
          rawSql: "SELECT\n  UNIX_TIMESTAMP(<time_column>) as time_sec,\n  <value column> as value,\n  <series name column> as metric\nFROM <table name>\nWHERE $__timeFilter(time_column)\nORDER BY <time_column> ASC\n",
          refId: "A",
          select: [
            [
              {
                params: [
                  "value"
                ],
                type: "column"
              }
            ]
          ],
          timeColumn: "time",
          where: [
            {
              name: "$__timeFilter",
              params: [],
              type: "macro"
            }
          ]
        }
      ]
  };
};
const GrafanaPanel = (props) => {
  return <div></div>;
};

export default GrafanaPanel;
