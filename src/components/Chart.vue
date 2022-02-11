<template>
  <div class="graph card">
    <h2>{{ title }}</h2>
    <apexchart type="area" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Chart",
  props: {
    title: String,
  },
  data() {
    return {
      options: {
        chart: {
          id: "token-price-chart",
          width: "100%",
          height: "100%",
          toolbar: { show: false },
          zoom: { enabled: false },
        },
        colors: ["#ef6100"],
        fill: {
          gradient: {
            opacityFrom: 0.3,
            opacityTo: 0,
          },
        },
        stroke: {
          width: 3,
        },
        xaxis: {
          type: "datetime",
          tooltip: { enabled: true },
          axisTicks: { show: false },
          labels: {
            style: {
              colors: "#666666",
              fontSize: "12px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              cssClass: "graph-xaxis-label",
            },
            offsetY: 0,
            format: undefined,
            formatter: undefined,
            datetimeUTC: true,
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM 'yy",
              day: "dd MMM",
              hour: "dd MMM",
            },
          },
          crosshairs: {
            show: true,
            stroke: {
              color: "#444444",
              width: 1,
              dashArray: 4,
            },
          },
          axisBorder: { show: false },
        },
        yaxis: {
          show: true,
          labels: {
            style: {
              colors: "#666666",
              fontSize: "12px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              cssClass: "graph-xaxis-label",
            },
            offsetX: 0,
          },
        },
        grid: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enabled: true,
          fixed: {
            enabled: false,
            position: "topRight",
            offsetX: 50,
            offsetY: 0,
          },
          custom: function ({ series, seriesIndex, dataPointIndex }) {
            return (
              '<div class="graph-tooltip">' +
              "<p>" +
              series[seriesIndex][dataPointIndex] +
              "</p>" +
              "</div>"
            );
          },
        },
        markers: {
          colors: "#ef6100",
          strokeColors: "#ef6100",
          strokeWidth: 0,
          hover: {
            size: 6,
          },
        },
      },
      series: [
        {
          name: "token-price",
          data: [],
        },
      ],
    };
  },
  mounted: async function () {
    await this.fetchPriceHistory();
    await this.$nextTick(() => {
      let priceData = this.priceHistory();
      // this.$data.options.xaxis.categories = priceData.time;
      // this.$data.series[0].data= priceData.price;
      this.$data.series[0].data = priceData.series;
    });
  },
  computed: mapGetters(["priceHistory"]),
  methods: {
    ...mapActions(["fetchPriceHistory"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/app.scss";
@import "@/style/tokens.scss";

.graph {
  width: 63%;
  h2 {
    font-size: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid $border;
    margin-bottom: 24px;
    text-align: center;
  }
}

@media only screen and (max-width: 600px) {
  .graph {
    width: 100%;
  }
}
</style>
