import React, { useState } from "react";
import "./chart.css";

const Chart = (props) => {
  const updateComponent =
  (props.onUpdate === undefined) ?  ((e) =>   console.log(e)):((e) =>   props.onUpdate(e));

  const allChartTypes = [
    {
      key: "violin",
      title: "Violin Chart",
      description:
        "Violin plots allow to visualize the distribution of a numeric variable for one or several groups.",
    },
    { key: "density", title: "Density plot", description: "" },
    { key: "histogram", title: "Histogram", description: "" },
    { key: "boxplot", title: "Boxplot", description: "" },
    { key: "ridgeline", title: "Ridgeline chart", description: "" },
    { key: "scatterplot", title: "Scatterplot", description: "" },
    { key: "heatmap", title: "Heatmap", description: "" },
    {
      key: "correlogram",
      title: "Correlogram",
      description:
        "A correlogram or correlation matrix allows to analyse the relationship between each pair of numeric variables of a dataset. This kind of chart is more used for exploratory purpose than explanatory ",
    },
    {
      key: "bubble",
      title: "Bubble plot",
      description:
        "A bubble plot is a scatter plot with a third numeric variable mapped to circle size. ",
    },
    {
      key: "connected_scatter",
      title: "Connected Scatterplot",
      description: "",
    },
    { key: "density_2d", title: "Density 2d", description: "" },
    {
      key: "barplot",
      title: "Barchart",
      description:
        "A barplot is used to display the relationship between a numerical and a categorical variable",
    },
    {
      key: "spider",
      title: "Spider chart or Radar",
      description:
        "A radar or spider or web chart is a two-dimensional chart type designed to plot one or more series of values over multiple quantitative variables. Each variable has its own axis, all axes are joined in the center of the figure.",
    },
    {
      key: "wordcloud",
      title: "Wordcloud",
      description:
        "A word cloud (also called tag cloud or weighted list) is a visual representation of text data. Words are usually single words, and the importance of each is shown with font size or color.",
    },
    {
      key: "parallel",
      title: "Parallel Coordinates chart",
      description:
        "Parallel plot or parallel coordinates plot allows to compare the feature of several individual observations (series) on a set of numeric variables. Each vertical bar represents a variable and often has its own scale. (The units can even be different). Values are then plotted as series of lines connected across each axis.",
    },
    {
      key: "lollipop",
      title: "Lollipop chart",
      description:
        "A lollipop plot is basically a barplot, where the bar is transformed in a line and a dot. It shows the relationship between a numeric and a categoric variable. The lollipop plot is used exactly in the same situation than a barplot. However it is somewhat more appealing and convey as well the information. It is especially useful when you have several bars of the same height: it avoids to have a cluttered figure and a Moiré effect.",
    },
    {
      key: "circular_barplot",
      title: "Circular barplot",
      description:
        "A circular barplot is a barplot, with each bar displayed along a circle instead of a line. Thus, it is advised to have a good understanding of how barplot works before making it circular.",
    },
    {
      key: "treemap",
      title: "Treemap",
      description:
        "A Treemap displays hierarchical data as a set of nested rectangles. Each group is represented by a rectangle, which area is proportional to its value.",
    },
    {
      key: "doughnut",
      title: "Donut chart",
      description:
        "The donut chart is similar to pie chart. A pie chart is a circle divided into sectors that each represent a proportion of the whole. It is often used to show percentage, where the sum of the sectors equals 100%. It is highly criticized in dataviz for meaningful reasons",
    },
    {
      key: "pie_chart",
      title: "Pie chart",
      description:
        "A pie chart is a circle divided into sectors that each represent a proportion of the whole. It is often used to show percentage, where the sum of the sectors equals 100%. It is highly criticized in dataviz for meaningful reasons",
    },
    {
      key: "dendrogram",
      title: "Dendrogram",
      description:
        "A dendrogram shows a hierarchical structure. It is constituted of a root node that gives birth to several nodes connected by edges or branches. Last nodes of the hierarchy are called leaves. ",
    },
    {
      key: "circular_packing",
      title: "Circular Packing",
      description:
        "Circular packing or circular treemap allows to visualize a hierarchic organization. It is an equivalent of a treemap or a dendrogram, where each node of the tree is represented as a circle and its sub-nodes are represented as circles inside of it.",
    },
    {
      key: "line_plot",
      title: "Line chart",
      description:
        "A line chart or line graph displays the evolution of one or several numeric variables. Data points are connected by straight line segments. It is similar to a scatter plot except that the measurement points are ordered (typically by their x-axis value) and joined with straight line segments. A line chart is often used to visualize a trend in data over intervals of time – a time series – thus the line is often drawn chronologically.",
    },
    {
      key: "area",
      title: "Area chart",
      description:
        "An area chart is really similar to a line chart and represents the evolution of a numeric variable. Basically, the X axis represents time or an ordered variable, and the Y axis gives the value of another variable. Data points are connected by straight line segments and the area between the x axis and the line is filled in with color or shading.",
    },
    {
      key: "stacked_area",
      title: "Stacked area chart",
      description:
        "A Stacked area chart is the extension of a basic area chart. It displays the evolution of a numerical value for several groups on the same chart, stacked on top of each other.",
    },
    {
      key: "streamchart",
      title: "Streamgraph or Streamchart",
      description:
        "A streamgraph is a type of stacked area chart. It represents the evolution of a numerical variable for several groups. Areas are usually displayed around a central axis, and edges are rounded to give a flowing shape.",
    },
    { key: "map", title: "Background map", description: "" },
    {
      key: "choropleth",
      title: "Choropleth map",
      description:
        "A choropleth map displays divided geographical areas or regions that are coloured in relation to a numeric variable. It allows to study how a variable evolutes along a territory.",
    },
    {
      key: "hexbin_map",
      title: "Hexbin map",
      description:
        "A hexbin map refers to two different concepts. It can be based on a geospatial object where all regions of the map are represented as hexagons. Or it can refer to a 2d density chart.",
    },
    {
      key: "cartogram",
      title: "Cartogram",
      description:
        "A cartogram is a map in which the geometry of regions is distorted in order to convey the information of an alternate variable. The region area will be inflated or deflated according to its numeric value.",
    },
    {
      key: "connection",
      title: "Connection map",
      description:
        "A connection map shows the connections between several positions on a map. The link between 2 locations is usually drawn using great circle: the shortest route between them. It results in a rounded line that gives a really pleasant look to the map.",
    },
    {
      key: "bubble_map",
      title: "Bubble map",
      description:
        "This kind of representations consists of a map with markers displayed on top of it. These markers can be circles with size proportional to a numerical value: that makes a bubble map.",
    },
    {
      key: "chord_diagram",
      title: "Chord Diagram",
      description:
        "A chord diagram represents flows or connections between several entities (called nodes). Each entity is represented by a fragment on the outer part of the circular layout. Then, arcs are drawn between each entities. The size of the arc is proportional to the importance of the flow. Chord diagrams allow to visualize weigthed relationships between several entities",
    },
    {
      key: "network",
      title: "Network graph",
      description:
        "Network diagrams (also called Graphs) show interconnections between a set of entities. Each entity is represented by a Node (or vertice). Connections between nodes are represented through links (or edges).",
    },
    {
      key: "sankey",
      title: "Sankey Diagram",
      description:
        "A Sankey Diagram is a visualisation technique that allows to display flows. Several entities (nodes) are represented by rectangles or text. Their links are represented with arrow or arcs that have a width proportional to the importance of the flow.",
    },
    {
      key: "arc_diagram",
      title: "Arc diagram",
      description:
        "An arc diagram is a special kind of network graph. It is constituted by nodes that represent entities and by links that show relationships between entities. In arc diagrams, nodes are displayed along a single axis and links are represented with arcs",
    },
    {
      key: "edge_bundling",
      title: "Hierarchical edge bundling",
      description:
        "Hierarchical edge bundling allows to visualize adjacency relations between entities organized in a hierarchy. The idea is to bundle the adjacency edges together to decrease the clutter usually observed in complex networks.",
    },
  ];

  const allChartClasses = [
    {
      key: "distribution",
      title: "Distribution",
      description:
        "Show values in a dataset and how often they occur. The shape (or ‘skew’) of a distribution can be a memorable way of highlighting the lack of uniformity or equality in the data.",
      graphs: ["violin", "density", "histogram", "boxplot", "ridgeline"],
    },
    {
      key: "correlation",
      title: "Correlation",
      description:
        "Show the relationship between two or more variables. Be mindful that, unless you tell them otherwise, many readers will assume the relationships you show them to be causal (i.e., one causes the other).",
      graphs: [
        "scatterplot",
        "heatmap",
        "correlogram",
        "bubble",
        "connected_scatter",
        "density_2d",
      ],
    },
    {
      key: "ranking",
      title: "Ranking",
      description:
        "Use where an item’s position in an ordered list is more important than its absolute or relative value. Don’t be afraid to highlight the points of interest.",
      graphs: [
        "barplot",
        "spider",
        "wordcloud",
        "parallel",
        "lollipop",
        "circular_barplot",
      ],
    },
    {
      key: "part_whole",
      title: "Part of a Whole",
      description:
        "Show how a single entity can be broken down into its component elements. If the reader’s interest is solely in the size of the components, consider a magnitude-type chart instead.",
      graphs: [
        "treemap",
        "doughnut",
        "pie_chart",
        "dendrogram",
        "circular_packing",
      ],
    },
    {
      key: "evolution",
      title: "Evolution",
      description:
        "Give emphasis to changing trends. These can be short (intra-day) movements or extended series traversing decades or centuries: Choosing the correct time period is important to provide suitable context for the reader.",
      graphs: ["line_plot", "area", "stacked_area", "streamchart"],
    },
    {
      key: "map",
      title: "Map",
      description:
        "Used only when precise locations or geographical patterns in data are more important to the reader than anything else.",
      graphs: [
        "map",
        "choropleth",
        "hexbin_map",
        "cartogram",
        "connection",
        "bubble_map",
      ],
    },
    {
      key: "flow",
      title: "Flow",
      description:
        "Show the reader volumes or intensity of movement between two or more states or conditions. These might be logical sequences or geographical locations.",
      graphs: [
        "chord_diagram",
        "network",
        "sankey",
        "arc_diagram",
        "edge_bundling",
      ],
    },
  ];
  const [selectClass, setSelectClass] = React.useState();
  const [selectChart, setSelectChart] = React.useState();
  const [chartTypes, setChartTypes] = React.useState([]);
  const [currentVisualElement, setCurrentVisualElement] = React.useState({
    key: "no",
    title: "Chard and graphics",
    description: "Select a chart to see a representation here",
  });

  const handleClassChange = (e) => {
    setSelectClass(e.currentTarget.value);

    let s_class = allChartClasses.reduce(
      (a, o) => (o.key === e.target.value && a.push(o), a),
      []
    );
    if (s_class.length === 0) {
      setSelectChart([]);
      setChartTypes([]);
      setCurrentVisualElement({
        key: "no",
        title: "Chard and graphics",
        description: "Select a chart to see a representation here",
      });
      return;
    }
    let graphs = s_class[0].graphs;
    let s_graphs = allChartTypes.reduce(
      (a, o) => (graphs.includes(o.key) && a.push(o), a),
      []
    );

    setChartTypes(s_graphs);
    setCurrentVisualElement(s_graphs[0]);

    updateComponent(s_graphs[0].title);
  };

  const handleTypeChange = (e) => {
    setSelectChart(e.currentTarget.value);
    let filtered = chartTypes.reduce(
      (a, o) => (o.title === e.currentTarget.value && a.push(o), a),
      []
    );
    setCurrentVisualElement(filtered[0]);
    updateComponent(filtered[0].title);
  };

  return (
    <div>
      <div className="row1">
        <label for="chart" className="form-label">
          Class of charts
        </label>
        <select
          className="form-select"
          id="chartClass"
          placeholder="chartclass"
          onChange={handleClassChange}
          value={selectClass}
        >
          <option key="None" value="None">
            Select a class
          </option>
          {allChartClasses.map((obj) => {
            return (
              <option key={obj.key} value={obj.key}>
                {obj.title}
              </option>
            );
          })}
        </select>
      </div>
      <label for="chart" className="form-label">
        Chart name
      </label>
      <select
        className="form-select"
        id="chartname"
        placeholder="chartname"
        onChange={handleTypeChange}
        value={selectChart}
      >
        {chartTypes.map((obj) => {
          return <option key={obj.key}>{obj.title}</option>;
        })}
      </select>

      <div className="chart_box">
        <div className="chart_box-overlay"></div>
        <img
          className="chart_box-image"
          src={
            process.env.PUBLIC_URL +
            "/charts/" +
            currentVisualElement.key +
            ".png"
          }
        />
        <div className="chart_box-details fadeIn-bottom">
          <p className="chart_box-text">
            <i className="fa fa-map-marker"></i>{" "}
            {currentVisualElement.description}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Chart;
