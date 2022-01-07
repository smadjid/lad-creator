export const BarChartPanel = (props) => {
  const rawSql = props.rawSql
    ? props.rawSql
    : 'SELECT name as Nom, count(*) as NB, now() as time\nFROM logs\nWHERE\nactivity_class = "Système" \ngroup by name\norder by 2 desc\nlimit 5';
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
        rawSql: rawSql,
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
  const rawSql = props.rawSql
    ? props.rawSql
    : 'SELECT SUBSTRING(name, 1, 40) as name, count(*) as total , now() as time\nFROM logs\nWHERE\n  $__timeFilter(timestamp) and log_type = "url"  and  \ngroup by name\norder by 2 desc\nlimit 5';
  let json = {
    id: props.id,
    gridPos: props.gridPos,
    type: "barchart",
    title: props.title + " : Les sites les plus consultés ",
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
        rawSql: rawSql,
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

export const lineChart = (props) => {
  const rawSq = props.rawSql
    ? props.rawSql
    : 'SELECT\n  timestamp AS "time", count(*) nb_actions\nFROM logs\nWHERE\n  $__timeFilter(timestamp)\n  GROUP by time\nORDER BY timestamp';
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
        rawSql: rawSq,
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

export const tableHeatChart = (props) => {
  const rawSql = props.rawSql
    ? props.rawSql
    : "SELECT Time(timestamp)  as 'Hour', SUBSTRING(content, 1, 20) as 'Act.', SUBSTRING(name, 1, 20) as 'Tool', TIME_FORMAT(dur, '%H:%i:%s') as 'Duration' FROM logs WHERE log_type = 'keystrokes' and activity_class='Information-Documentation' order by timestamp";
  let json = {
    id: props.id,
    gridPos: props.gridPos,
    type: "briangann-datatable-panel",
    title: props.title + " : Documantary activities",
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
        rawSql: rawSql,
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

export const radarChart = (props) =>{
  const rawSql = props.rawSql
    ? props.rawSql
    : "SELECT title, student_skills, course_skills \nFROM lada_student_courses\nlimit 5";
  return{
    id: props.id,
    gridPos: props.gridPos,
    "title": props.title,
      "type": "smadjid-radar-panel",
      "targets": [
        {
          "refId": "A",
          "format": "table",
          "timeColumn": "time",
          "metricColumn": "none",
          "group": [],
          "where": [
            {
              "type": "macro",
              "name": "$__timeFilter",
              "params": []
            }
          ],
          "select": [
            [
              {
                "type": "column",
                "params": [
                  "id"
                ]
              }
            ]
          ],
          "rawQuery": true,
          "rawSql": rawSql,
          "table": "devices",
          "timeColumnType": "timestamp"
        }
      ],
      "options": {
        "text": "Default value !!!",
        "showSeriesCount": false,
        "seriesCountSize": "sm",
        "color": "red",
        "theme": "red"
      },
      "datasource": null
    }
  
}
export const tableChart = (props) => {
  const rawSql = props.rawSql
    ? props.rawSql
    : "SELECT\n   code,title,grade,year,status\nFROM lada_student_courses\n\nORDER BY code";
 return{
    id: props.id,
    gridPos: props.gridPos,
    "title": props.title,
    "type": "briangann-datatable-panel",    
    "targets": [
      {
        "refId": "A",
        "format": "table",
        "timeColumn": "time",
        "metricColumn": "none",
        "group": [],
        "where": [
          {
            "type": "macro",
            "name": "$__timeFilter",
            "params": []
          }
        ],
        "select": [
          [
            {
              "type": "column",
              "params": [
                "id"
              ]
            }
          ]
        ],
        "rawQuery": true,
        "rawSql": rawSql,
        "timeColumnType": "timestamp"
      }
    ],
    "pluginVersion": "8.0.5",
    "styles": [
      {
        "type": "date",
        "pattern": "Time",
        "dateFormat": "YYYY-MM-DD HH:mm:ss",
        "$$hashKey": "object:68"
      },
      {
        "unit": "none",
        "type": "number",
        "decimals": 0,
        "colors": [
          "rgba(245, 54, 54, 0.9)",
          "rgba(237, 129, 40, 0.89)",
          "rgba(50, 172, 45, 0.97)"
        ],
        "colorMode": null,
        "pattern": "/.*/",
        "thresholds": [],
        "$$hashKey": "object:69",
        "splitPattern": "/ /"
      }
    ],
    "transform": "table",
    "rowsPerPage": 5,
    "showHeader": true,
    "columns": [],
    "scroll": true,
    "scrollHeight": "default",
    "fontSize": "100%",
    "sort": {
      "col": 0,
      "desc": true
    },
    "columnAliases": [],
    "columnWidthHints": [],
    "sortByColumnsData": [
      [
        0,
        "desc"
      ]
    ],
    "sortByColumns": [
      {
        "columnData": 0,
        "sortMethod": "desc",
        "$$hashKey": "object:66"
      }
    ],
    "datatableTheme": "basic_theme",
    "themeOptions": {
      "light": "./styles/light.scss",
      "dark": "./styles/dark.scss"
    },
    "alignNumbersToRightEnabled": true,
    "searchHighlightingEnabled": true,
    "infoEnabled": false,
    "showCellBorders": true,
    "hoverEnabled": true,
    "orderColumnEnabled": true,
    "stripedRowsEnabled": true,
    "lengthChangeEnabled": true,
    "columnFiltersEnabled": true,
    "datatablePagingType": "numbers",
    "pagingTypes": [
      {
        "text": "Page number buttons only",
        "value": "numbers",
        "$$hashKey": "object:257"
      },
      {
        "text": "'Previous' and 'Next' buttons only",
        "value": "simple",
        "$$hashKey": "object:258"
      },
      {
        "text": "'Previous' and 'Next' buttons, plus page numbers",
        "value": "simple_numbers",
        "$$hashKey": "object:259"
      },
      {
        "text": "'First', 'Previous', 'Next' and 'Last' buttons",
        "value": "full",
        "$$hashKey": "object:260"
      },
      {
        "text": "'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers",
        "value": "full_numbers",
        "$$hashKey": "object:261"
      },
      {
        "text": "'First' and 'Last' buttons, plus page numbers",
        "value": "first_last_numbers",
        "$$hashKey": "object:262"
      }
    ],
    "themes": [
      {
        "value": "basic_theme",
        "text": "Basic",
        "disabled": false,
        "$$hashKey": "object:232"
      },
      {
        "value": "bootstrap_theme",
        "text": "Bootstrap",
        "disabled": true,
        "$$hashKey": "object:233"
      },
      {
        "value": "foundation_theme",
        "text": "Foundation",
        "disabled": true,
        "$$hashKey": "object:234"
      },
      {
        "value": "themeroller_theme",
        "text": "ThemeRoller",
        "disabled": true,
        "$$hashKey": "object:235"
      }
    ],
    "panelHeight": 127,
    "searchEnabled": false,
    "description": "",
    "rowNumbersEnabled": false,
    "showRowBorders": false,
    "compactRowsEnabled": false,
    "emptyData": false,
    "datasource": null
  }
};

export const pieChart = (props) => {
  const rawSql = props.rawSql
    ? props.rawSql
    : 'SELECT st_name, count(*) " ", now() as time\nFROM logs\nWHERE\nactivity_class = "Système" \ngroup by name\norder by 2 desc\nlimit 5';
  return {
    id: props.id,
    gridPos: props.gridPos,
    type: "piechart",
    title: props.title,
    fieldConfig: {
      defaults: {
        custom: {
          hideFrom: {
            tooltip: false,
            viz: false,
            legend: false,
          },
        },
        color: {
          mode: "palette-classic",
        },
        mappings: [],
      },
      overrides: [],
    },
    options: {
      reduceOptions: {
        values: true,
        calcs: ["lastNotNull"],
        fields: "",
      },
      pieType: "pie",
      displayLabels: ["value"],
      tooltip: {
        mode: "multi",
      },
      legend: {
        displayMode: "list",
        placement: "right",
        values: [],
      },
    },
    targets: [
      {
        format: "time_series",
        group: [],
        metricColumn: "none",
        rawQuery: true,
        rawSql: rawSql,
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
    datasource: null,
  };
};

export const gaugeChart = (props) => {
  const rawSql = props.rawSql
    ? props.rawSql
    : "SELECT\n  now() AS time, \n  chances\nFROM lada_predict";
  return {
    id: props.id,
    gridPos: props.gridPos,
    title: props.title,
    type: "gauge",
    pluginVersion: "8.0.5",
    targets: [
      {
        refId: "A",
        format: "time_series",
        timeColumn: "time",
        metricColumn: "none",
        group: [],
        where: [
          {
            type: "macro",
            name: "$__timeFilter",
            params: [],
          },
        ],
        select: [
          [
            {
              type: "column",
              params: ["id"],
            },
          ],
        ],
        rawQuery: true,
        rawSql: rawSql,
        table: "devices",
        timeColumnType: "timestamp",
      },
    ],
    options: {
      reduceOptions: {
        values: false,
        calcs: ["lastNotNull"],
        fields: "",
      },
      showThresholdLabels: false,
      showThresholdMarkers: true,
      text: {},
    },
    fieldConfig: {
      defaults: {
        thresholds: {
          mode: "absolute",
          steps: [
            {
              color: "blue",
              value: null,
            },
            {
              color: "red",
              value: 0,
            },
            {
              color: "#EAB839",
              value: 50,
            },
            {
              color: "green",
              value: 80,
            },
          ],
        },
        mappings: [],
        color: {
          mode: "thresholds",
        },
        unit: "percent",
        min: 0,
        max: 100,
      },
      overrides: [],
    },
    datasource: null,
  };
};

export const textualGradChart = (props) => {
  const rawSql = props.rawSql
    ? props.rawSql
    : "SELECT\n  now() AS time, \n  chances\nFROM lada_predict";
  return {
    id: props.id,
    gridPos: props.gridPos,
    title: props.title,
    type: "stat",
    pluginVersion: "8.0.5",
    "targets": [
      {
        "refId": "A",
        "format": "time_series",
        "timeColumn": "time",
        "metricColumn": "none",
        "group": [],
        "where": [
          {
            "type": "macro",
            "name": "$__timeFilter",
            "params": []
          }
        ],
        "select": [
          [
            {
              "type": "column",
              "params": [
                "id"
              ]
            }
          ]
        ],
        "rawQuery": true,
        "rawSql": rawSql,
        "table": "devices",
        "timeColumnType": "timestamp"
      }
    ],
    "options": {
      "reduceOptions": {
        "values": false,
        "calcs": [
          "lastNotNull"
        ],
        "fields": ""
      },
      "orientation": "auto",
      "text": {},
      "textMode": "auto",
      "colorMode": "value",
      "graphMode": "area",
      "justifyMode": "center"
    },
    "fieldConfig": {
      "defaults": {
        "thresholds": {
          "mode": "absolute",
          "steps": [
            {
              "color": "blue",
              "value": null
            },
            {
              "color": "red",
              "value": 0
            },
            {
              "color": "#EAB839",
              "value": 50
            },
            {
              "color": "green",
              "value": 80
            }
          ]
        },
        "mappings": [
          {
            "type": "range",
            "options": {
              "from": 0,
              "to": 20,
              "result": {
                "text": "Very Bad",
                "index": 0
              }
            }
          },
          {
            "type": "range",
            "options": {
              "from": 20,
              "to": 50,
              "result": {
                "text": "Bad",
                "index": 1
              }
            }
          },
          {
            "type": "range",
            "options": {
              "from": 50,
              "to": 80,
              "result": {
                "text": "Good",
                "index": 2
              }
            }
          },
          {
            "type": "range",
            "options": {
              "from": 80,
              "to": 100,
              "result": {
                "text": "Very Good",
                "index": 3
              }
            }
          }
        ],
        "color": {
          "mode": "thresholds"
        },
        "unit": "percent",
        "min": 0,
        "max": 100
      },
      "overrides": []
    },
    "datasource": null
  };
};

export const histoChart = (props) => {
  const rawSql = props.rawSql
    ? props.rawSql
    : "SELECT concat(title, ' (',code, ')'), achieved*100/plan as percent FROM lada_student_courses ORDER BY code";
 return{
    id: props.id,
    gridPos: props.gridPos,
    "title": props.title,
        "type": "barchart",
        "targets": [
          {
            "refId": "A",
            "format": "table",
            "timeColumn": "time",
            "metricColumn": "none",
            "group": [],
            "where": [
              {
                "type": "macro",
                "name": "$__timeFilter",
                "params": []
              }
            ],
            "select": [
              [
                {
                  "type": "column",
                  "params": [
                    "id"
                  ]
                }
              ]
            ],
            "rawQuery": true,
            "rawSql": rawSql,
            "table": "devices",
            "timeColumnType": "timestamp"
          }
        ],
        "options": {
          "orientation": "horizontal",
          "showValue": "always",
          "groupWidth": 0.7,
          "barWidth": 0.5,
          "tooltip": {
            "mode": "single"
          },
          "legend": {
            "displayMode": "hidden",
            "placement": "bottom",
            "calcs": []
          },
          "text": {}
        },
        "fieldConfig": {
          "defaults": {
            "custom": {
              "lineWidth": 1,
              "fillOpacity": 35,
              "gradientMode": "none",
              "axisPlacement": "auto",
              "axisLabel": "",
              "axisSoftMin": 0,
              "hideFrom": {
                "tooltip": false,
                "viz": false,
                "legend": false
              }
            },
            "color": {
              "mode": "fixed",
              "fixedColor": "blue"
            },
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "transparent",
                  "value": null
                }
              ]
            },
            "mappings": [],
            "unit": "percent"
          },
          "overrides": []
        },
        "pluginVersion": "8.0.5",
        "datasource": null
      }
}
export const dotCompareChart = (props) => {
  const rawSql = props.rawSql
    ? props.rawSql
    : "select * from  (SELECT id student , grade  FROM at41.lada_students_grades) a  CROSS JOIN (SELECT  id thestudent , grade thegrade  FROM at41.lada_students_grades where id=19) b";
 return{
    id: props.id,
    gridPos: props.gridPos,
    "title": props.title,
    "type": "natel-plotly-panel",
    "pconfig": {
      "fixScale": "",
      "layout": {
        "dragmode": "zoom",
        "font": {
          "family": "\"Open Sans\", Helvetica, Arial, sans-serif"
        },
        "hovermode": "closest",
        "legend": {
          "orientation": "h"
        },
        "showlegend": false,
        "xaxis": {
          "rangemode": "normal",
          "showgrid": true,
          "type": "linear",
          "zeroline": false
        },
        "yaxis": {
          "rangemode": "normal",
          "showgrid": true,
          "title": "Student numer",
          "type": "linear",
          "zeroline": false
        },
        "zaxis": {
          "rangemode": "normal",
          "showgrid": true,
          "type": "linear",
          "zeroline": false
        }
      },
      "loadFromCDN": false,
      "settings": {
        "displayModeBar": false,
        "type": "scatter"
      },
      "showAnnotations": true,
      "traces": [
        {
          "mapping": {
            "color": "student",
            "size": null,
            "text": null,
            "x": "grade",
            "y": "student",
            "z": null
          },
          "name": "Trace 1",
          "settings": {
            "color_option": "solid",
            "line": {
              "color": "#005f81",
              "dash": "solid",
              "shape": "linear",
              "width": 6
            },
            "marker": {
              "color": "#33B5E5",
              "colorscale": "Reds",
              "line": {
                "color": "#DDD",
                "width": 0
              },
              "showscale": false,
              "size": 10,
              "sizemin": 3,
              "sizemode": "diameter",
              "sizeref": 0.2,
              "symbol": "circle"
            }
          },
          "show": {
            "line": true,
            "lines": false,
            "markers": true
          }
        },
        {
          "mapping": {
            "color": "student",
            "size": null,
            "text": "thestudent",
            "x": "thegrade",
            "y": "thestudent",
            "z": null
          },
          "name": "Trace 2",
          "settings": {
            "color_option": "solid",
            "line": {
              "color": "#005f81",
              "dash": "solid",
              "shape": "linear",
              "width": 6
            },
            "marker": {
              "color": "#F2495C",
              "colorscale": "Reds",
              "line": {
                "color": "#DDD",
                "width": 0
              },
              "showscale": false,
              "size": 10,
              "sizemin": 3,
              "sizemode": "diameter",
              "sizeref": 0.2,
              "symbol": "circle"
            },
            "textposition": "bottom"
          },
          "show": {
            "line": true,
            "lines": false,
            "markers": true
          }
        }
      ]
    },
    "targets": [
      {
        "format": "table",
        "group": [],
        "metricColumn": "none",
        "rawQuery": true,
        "rawSql": rawSql,
        "refId": "A",
        "select": [
          [
            {
              "params": [
                "id"
              ],
              "type": "column"
            }
          ]
        ],
        "table": "devices",
        "timeColumn": "time",
        "timeColumnType": "timestamp",
        "where": [
          {
            "name": "$__timeFilter",
            "params": [],
            "type": "macro"
          }
        ]
      }
    ],
    "version": 1,
    "datasource": null
  }
}

export const histLineChart = (props) => {
  const rawSql = props.rawSql
    ? props.rawSql
    : "SELECT UNIX_TIMESTAMP(STR_TO_DATE(date,'%d/%m/%Y') ) time, count  FROM lada_historical;";
 return{
    id: props.id,
    gridPos: props.gridPos,
    "title": props.title,
      "type": "timeseries",
      "pluginVersion": "8.0.5",
      "fieldConfig": {
        "defaults": {
          "custom": {
            "drawStyle": "line",
            "lineInterpolation": "linear",
            "barAlignment": 0,
            "lineWidth": 1,
            "fillOpacity": 10,
            "gradientMode": "none",
            "spanNulls": true,
            "showPoints": "always",
            "pointSize": 5,
            "stacking": {
              "mode": "none",
              "group": "A"
            },
            "axisPlacement": "auto",
            "axisLabel": "",
            "scaleDistribution": {
              "type": "linear"
            },
            "hideFrom": {
              "tooltip": false,
              "viz": false,
              "legend": false
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "color": {
            "mode": "palette-classic"
          },
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "mappings": []
        },
        "overrides": []
      },
      "options": {
        "tooltip": {
          "mode": "single"
        },
        "legend": {
          "displayMode": "hidden",
          "placement": "bottom",
          "calcs": []
        }
      },
      "targets": [
        {
          "format": "time_series",
          "group": [],
          "metricColumn": "none",
          "rawQuery": true,
          "rawSql": rawSql,
          "refId": "A",
          "select": [
            [
              {
                "params": [
                  "id"
                ],
                "type": "column"
              }
            ]
          ],
          "table": "devices",
          "timeColumn": "time",
          "timeColumnType": "timestamp",
          "where": [
            {
              "name": "$__timeFilter",
              "params": [],
              "type": "macro"
            }
          ]
        }
      ],
      "timeFrom": null,
      "timeShift": null,
      "datasource": null
    }
}

export const stackedBarChart = (props) => {
  const rawSql = props.rawSql
    ? props.rawSql
    : "SELECT title, student_skills, similar_student_skills, course_skills FROM lada_student_courses";
  return {
    id: props.id,
    gridPos: props.gridPos,
    "title": props.title,
  "type": "barchart",
  "pluginVersion": "8.0.5",
  "targets": [
    {
      "format": "table",
      "group": [],
      "metricColumn": "none",
      "rawQuery": true,
      "rawSql": rawSql,
      "refId": "A",
      "select": [
        [
          {
            "params": [
              "id"
            ],
            "type": "column"
          }
        ]
      ],
      "table": "devices",
      "timeColumn": "time",
      "timeColumnType": "timestamp",
      "where": [
        {
          "name": "$__timeFilter",
          "params": [],
          "type": "macro"
        }
      ]
    }
  ],
  "options": {
    "orientation": "auto",
    "showValue": "auto",
    "groupWidth": 0.63,
    "barWidth": 0.72,
    "tooltip": {
      "mode": "single"
    },
    "legend": {
      "displayMode": "table",
      "placement": "bottom",
      "calcs": []
    },
    "text": {}
  },
  "fieldConfig": {
    "defaults": {
      "custom": {
        "lineWidth": 1,
        "fillOpacity": 80,
        "gradientMode": "none",
        "axisPlacement": "auto",
        "axisLabel": "",
        "axisSoftMin": 0,
        "hideFrom": {
          "tooltip": false,
          "viz": false,
          "legend": false
        }
      },
      "color": {
        "mode": "palette-classic"
      },
      "thresholds": {
        "mode": "absolute",
        "steps": [
          {
            "value": null,
            "color": "green"
          },
          {
            "value": 80,
            "color": "red"
          }
        ]
      },
      "mappings": []
    },
    "overrides": []
  },
  "datasource": null
}
}