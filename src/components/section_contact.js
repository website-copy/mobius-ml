import React from 'react'
import './section_contact.module.css'

const MAPS_API_KEY = process.env.MAPS_API_KEY

const MAP_DIMS = [576, 340]

const MAPS_URL = `https://maps.googleapis.com/maps/api/staticmap
?key=${MAPS_API_KEY}
&center=Rudi-Dutschke-Straße 23, Berlin, Germany
&zoom=17
&format=png
&maptype=roadmap
&style=element:geometry%7Ccolor:0x212121
&style=element:labels.icon%7Cvisibility:off
&style=element:labels.text.fill%7Ccolor:0x757575
&style=element:labels.text.stroke%7Ccolor:0x212121
&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575
&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e
&style=feature:administrative.land_parcel%7Cvisibility:off
&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd
&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575
&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818
&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161
&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b
&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c
&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a
&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737
&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c
&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e
&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161
&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575
&style=feature:water%7Celement:geometry%7Ccolor:0x000000
&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d
&size=${MAP_DIMS.join('x')}`.replace(/\s/g, '')

const SectionContact = () => (
  <section styleName='contact'>
    <div className='container'>
      <div className='row no-gutters'>
        <div className='col-md-6'>
          <div className='d-flex flex-column justify-content-center' styleName='text'>
            <div className='sm-gutters'>
              <h3>Contact</h3>
              <p>
                <a href='mailto:hey@mobius.ml'>hey@mobius.ml</a>
                <br /><br />
                Mobius Labs GmbH<br />
                Rudi-Dutschke-Straße 23<br />
                10969 Berlin<br />
              </p>
              <a href='https://www.google.com/maps/dir//betahaus+%7C+Berlin+Kreuzberg+-+Coworking+%26+Event+Spaces,+Rudi-Dutschke-Stra%C3%9Fe+23,+10969+Berlin/@52.5066818,13.3893396,17z/' className='btn'>Get directions</a>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div styleName='map'>
            <a href='https://www.google.com/maps/dir//betahaus+%7C+Berlin+Kreuzberg+-+Coworking+%26+Event+Spaces,+Rudi-Dutschke-Stra%C3%9Fe+23,+10969+Berlin/@52.5066818,13.3893396,17z/'>
              <img
                alt='Our location'
                src={`${MAPS_URL}&size=${MAP_DIMS.join('x')}`}
                srcSet={[
                  `${MAPS_URL}&scale=1.5 1.5x`,
                  `${MAPS_URL}&scale=2 2x`,
                  `${MAPS_URL}&scale=3 3x`
                ].join()}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default SectionContact
