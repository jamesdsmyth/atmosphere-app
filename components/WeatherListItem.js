const WeatherListItem = ( { weather } ) => (
    weather.map((x, i) => {
      while(i < 6) {
        const temperature = Math.round(x.main.temp - 273.15);
        const sectionClass = i === 0 ? styles.sectionNow : styles.sectionLater;
        const updatedTemperature = temperature < 0 ? temperature + 100 : temperature;
        const sectionTemperature = styles[`section${updatedTemperature}`];
        const timeArray = x.dt_txt.split('');
        const strippedTime = timeArray.slice(timeArray.length - 8, timeArray.length - 3);

        return  <View style={[styles.section, sectionClass, sectionTemperature]} key={i}>
                  {
                    i === 0 ?
                    <View style={[styles.sectionInner]} key={i}>
                      <Text style={styles.sectionText} key={i}>
                        {temperature}&#176;c and {x.weather[0].main.toLowerCase()} right now
                      </Text>
                      <WeatherSvg weatherType={x.weather[0].main} />
                    </View>:
                    <View style={[styles.sectionInner]} key={i}>
                      <Text style={styles.sectionText} key={i}>
                        {temperature}&#176;c at {strippedTime}
                      </Text>
                      <WeatherSvg weatherType={x.weather[0].main} />
                    </View>
                  }
                </View>;
      }
    })
)

export default WeatherListItem;