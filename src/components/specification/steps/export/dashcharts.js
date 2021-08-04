export const BarChartPanel = (props) => {
  //console.log(props.gridPos);
  let json = {
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
    gridPos: props.gridPos,
    id: props.id,
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
        format: "table",
        group: [],
        metricColumn: "none",
        rawQuery: true,
        rawSql:
          'SELECT name as Nom, count(*) as NB, now() as time\nFROM logs\nWHERE\nactivity_class = "Système" \ngroup by name\norder by 2 desc\nlimit 5',
        refId: "A",
        select: [
          [
            {
              params: ["id"],
              type: "column",
            },
          ],
        ],
        table: "devices",
        timeColumn: "time",
        timeColumnType: "timestamp",
        where: [
          {
            name: "$__timeFilter",
            params: [],
            type: "macro",
          },
        ],
      },
    ],
    title: props.title,
    type: "barchart",
  };
  //console.log(json)
  return json;
};

export const HBarChartPanel = (props) => {
  //console.log(props.gridPos);
  let json = {
    id: props.id,
    gridPos: props.gridPos,
    type: "barchart",
    title: props.title + " : Les sites les plus consultés par l'élève $student",
    pluginVersion: "8.0.5",
    fieldConfig: {
      defaults: {
        custom: {
          lineWidth: 0,
          fillOpacity: 75,
          gradientMode: "none",
          axisPlacement: "auto",
          axisLabel: "",
          axisSoftMin: 0,
          hideFrom: {
            tooltip: false,
            viz: false,
            legend: false,
          },
        },
        color: {
          mode: "palette-classic",
        },
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
        mappings: [],
      },
      overrides: [],
    },
    targets: [
      {
        format: "table",
        group: [],
        metricColumn: "none",
        rawQuery: true,
        rawSql:
          'SELECT SUBSTRING(name, 1, 40) as name, count(*) as total , now() as time\nFROM logs\nWHERE\n  $__timeFilter(timestamp) and log_type = "url"  and st_name="$student" \ngroup by name\norder by 2 desc\nlimit 5',
        refId: "A",
        select: [
          [
            {
              params: ["id"],
              type: "column",
            },
          ],
        ],
        table: "logs",
        timeColumn: "timestamp",
        timeColumnType: "timestamp",
        where: [
          {
            name: "$__timeFilter",
            params: [],
            type: "macro",
          },
        ],
      },
    ],
    timeFrom: null,
    timeShift: null,
    options: {
      orientation: "horizontal",
      showValue: "auto",
      groupWidth: 0.7,
      barWidth: 0.48,
      tooltip: {
        mode: "single",
      },
      legend: {
        displayMode: "list",
        placement: "bottom",
        calcs: [],
      },
      text: {},
    },
    datasource: null,
  };
  //console.log(json)
  return json;
};

const lineChart = (props) => {
  let json = {
    id: props.id,
    gridPos: props.gridPos,
    type: "timeseries",
    title: "Evolution du nombre total d'actions enregistrées",
    pluginVersion: "8.0.5",
    fieldConfig: {
      defaults: {
        custom: {
          drawStyle: "line",
          lineInterpolation: "stepBefore",
          barAlignment: 0,
          lineWidth: 1,
          fillOpacity: 10,
          gradientMode: "none",
          spanNulls: true,
          showPoints: "auto",
          pointSize: 2,
          stacking: {
            mode: "normal",
            group: "A",
          },
          axisPlacement: "auto",
          axisLabel: "",
          scaleDistribution: {
            type: "linear",
          },
          hideFrom: {
            tooltip: false,
            viz: false,
            legend: false,
          },
          thresholdsStyle: {
            mode: "off",
          },
          lineStyle: {
            fill: "solid",
          },
        },
        color: {
          mode: "palette-classic",
        },
        thresholds: {
          mode: "absolute",
          steps: [
            {
              value: null,
              color: "green",
            },
            {
              value: 80,
              color: "red",
            },
          ],
        },
        mappings: [],
        unit: "short",
      },
      overrides: [],
    },
    options: {
      tooltip: {
        mode: "single",
      },
      legend: {
        displayMode: "list",
        placement: "bottom",
        calcs: [],
      },
    },
    targets: [
      {
        format: "table",
        group: [],
        metricColumn: "none",
        rawQuery: true,
        rawSql:
          'SELECT\n  timestamp AS "time", count(*) nb_actions\nFROM logs\nWHERE\n  $__timeFilter(timestamp)\n  GROUP by time\nORDER BY timestamp',
        refId: "A",
        select: [
          [
            {
              params: ["id"],
              type: "column",
            },
          ],
        ],
        table: "logs",
        timeColumn: "timestamp",
        timeColumnType: "timestamp",
        where: [
          {
            name: "$__timeFilter",
            params: [],
            type: "macro",
          },
        ],
      },
    ],
    timeFrom: null,
    timeShift: null,
    datasource: null,
  };
  return json;
};

const tableChart = (props) => {
  let json = {
    id: props.id,
    gridPos: props.gridPos,
    type: "briangann-datatable-panel",
    title: props.title+ " : Documantary activities",
    repeat: "theme",
    pluginVersion: "7.4.3",
    alignNumbersToRightEnabled: true,
    columnAliases: [],
    columnFiltersEnabled: false,
    columnWidthHints: [],
    columns: [],
    compactRowsEnabled: true,
    datatablePagingType: "simple_numbers",
    datatableTheme: "basic_theme",
    emptyData: false,
    fontSize: "90%",
    hoverEnabled: true,
    infoEnabled: false,
    lengthChangeEnabled: true,
    orderColumnEnabled: false,
    pagingTypes: [
      {
        $$hashKey: "object:2989",
        text: "Page number buttons only",
        value: "numbers",
      },
      {
        $$hashKey: "object:2990",
        text: "'Previous' and 'Next' buttons only",
        value: "simple",
      },
      {
        $$hashKey: "object:2991",
        text: "'Previous' and 'Next' buttons, plus page numbers",
        value: "simple_numbers",
      },
      {
        $$hashKey: "object:2992",
        text: "'First', 'Previous', 'Next' and 'Last' buttons",
        value: "full",
      },
      {
        $$hashKey: "object:2993",
        text: "'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers",
        value: "full_numbers",
      },
      {
        $$hashKey: "object:2994",
        text: "'First' and 'Last' buttons, plus page numbers",
        value: "first_last_numbers",
      },
    ],
    panelHeight: 246,
    rowNumbersEnabled: true,
    rowsPerPage: 5,
    scroll: true,
    scrollHeight: "default",
    searchEnabled: true,
    searchHighlightingEnabled: true,
    showCellBorders: false,
    showHeader: true,
    showRowBorders: true,
    sort: {
      col: 0,
      desc: true,
    },
    sortByColumns: [
      {
        $$hashKey: "object:2927",
        columnData: 0,
        sortMethod: "asc",
      },
    ],
    sortByColumnsData: [[1, "asc"]],
    stripedRowsEnabled: true,
    styles: [
      {
        $$hashKey: "object:2929",
        dateFormat: "YYYY-MM-DD HH:mm:ss",
        pattern: "Heure",
        type: "date",
      },
      {
        $$hashKey: "object:2930",
        colorMode: null,
        colors: [
          "rgba(245, 54, 54, 0.9)",
          "rgba(237, 129, 40, 0.89)",
          "rgba(50, 172, 45, 0.97)",
        ],
        decimals: 2,
        pattern: "/.*/",
        splitPattern: "/ /",
        thresholds: [],
        type: "number",
        unit: "short",
      },
    ],
    targets: [
      {
        format: "table",
        group: [],
        metricColumn: "none",
        rawQuery: true,
        rawSql:
          'SELECT Time(timestamp)  as \'Hour\', SUBSTRING(content, 1, 20) as \'Act.\',\nSUBSTRING(name, 1, 20) as \'Tool\',\nTIME_FORMAT(dur, "%H:%i:%s") as "Duration"\nFROM logs\nWHERE\n   log_type = "keystrokes"  and st_name="$student" and $seance="$seance" and activity_class=\'Information-Documentation\'\norder by timestamp',
        refId: "A",
        select: [
          [
            {
              params: ["id"],
              type: "column",
            },
          ],
        ],
        table: "logs",
        timeColumn: "timestamp",
        timeColumnType: "timestamp",
        where: [
          {
            name: "$__timeFilter",
            params: [],
            type: "macro",
          },
        ],
      },
    ],
    themeOptions: {
      dark: "./styles/dark.scss",
      light: "./styles/light.scss",
    },
    themes: [
      {
        $$hashKey: "object:2964",
        disabled: false,
        text: "Basic",
        value: "basic_theme",
      },
      {
        $$hashKey: "object:2965",
        disabled: true,
        text: "Bootstrap",
        value: "bootstrap_theme",
      },
      {
        $$hashKey: "object:2966",
        disabled: true,
        text: "Foundation",
        value: "foundation_theme",
      },
      {
        $$hashKey: "object:2967",
        disabled: true,
        text: "ThemeRoller",
        value: "themeroller_theme",
      },
    ],
    timeFrom: null,
    timeShift: null,
    transform: "table",
    scopedVars: {
      theme: {
        text: "Système",
        value: "Système",
        selected: true,
      },
    },
    datasource: null,
  };
  return json;
};
