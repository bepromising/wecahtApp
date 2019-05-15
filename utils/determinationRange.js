
function isPointInRect(point, sw, ne) {
  return (point.lng >= sw.lng && point.lng <= ne.lng && point.lat >= sw.lat && point.lat <= ne.lat);
}

function isPointInPolygon (point) {
  let pts = [
    { lng: 113.063689, lat: 22.910462 },
    { lng: 113.063319, lat: 22.916363 },
    { lng: 113.058366, lat: 22.919081 },
    { lng: 113.060752, lat: 22.923588 },
    { lng: 113.05093, lat: 22.926753 },
    { lng: 113.050438, lat: 22.929914 },
    { lng: 113.053919, lat: 22.936021 },
    { lng: 113.064123, lat: 22.935577 },
    { lng: 113.075392, lat: 22.940698 },
    { lng: 113.073115, lat: 22.957283 },
    { lng: 113.068308, lat: 22.955743 },
    { lng: 113.064398, lat: 22.964097 },
    { lng: 113.058646, lat: 22.965425 },
    { lng: 113.056745, lat: 22.975336 },
    { lng: 113.062719, lat: 22.982307 },
    { lng: 113.084255, lat: 22.984256 },
    { lng: 113.118771, lat: 22.975772 },
    { lng: 113.13862, lat: 22.978898 },
    { lng: 113.154215, lat: 22.991169 },
    { lng: 113.170859, lat: 22.987527 },
    { lng: 113.174461, lat: 22.998956 },
    { lng: 113.181525, lat: 22.994106 },
    { lng: 113.189537, lat: 22.998798 },
    { lng: 113.191121, lat: 23.006134 },
    { lng: 113.196019, lat: 23.004461 },
    { lng: 113.206853, lat: 23.011415 },
    { lng: 113.21177, lat: 23.007944 },
    { lng: 113.225781, lat: 23.008615 },
    { lng: 113.229097, lat: 22.996503 },
    { lng: 113.237494, lat: 22.984669 },
    { lng: 113.24632, lat: 22.985669 },
    { lng: 113.251322, lat: 22.981419 },
    { lng: 113.255552, lat: 22.98204 },
    { lng: 113.256602, lat: 22.974974 },
    { lng: 113.272743, lat: 22.964033 },
    { lng: 113.272399, lat: 22.959119 },
    { lng: 113.279544, lat: 22.961777 },
    { lng: 113.290694, lat: 22.956465 },
    { lng: 113.300666, lat: 22.945043 },
    { lng: 113.303233, lat: 22.937958 },
    { lng: 113.287833, lat: 22.932009 },
    { lng: 113.291967, lat: 22.906424 },
    { lng: 113.283772, lat: 22.905623 },
    { lng: 113.281626, lat: 22.898677 },
    { lng: 113.304935, lat: 22.882775 },
    { lng: 113.303332, lat: 22.877156 },
    { lng: 113.306507, lat: 22.871135 },
    { lng: 113.303126, lat: 22.867586 },
    { lng: 113.310153, lat: 22.856291 },
    { lng: 113.314788, lat: 22.855342 },
    { lng: 113.315795, lat: 22.839981 },
    { lng: 113.319842, lat: 22.832917 },
    { lng: 113.339852, lat: 22.823236 },
    { lng: 113.349048, lat: 22.825248 },
    { lng: 113.35178, lat: 22.82079 },
    { lng: 113.360507, lat: 22.826916 },
    { lng: 113.379886, lat: 22.827226 },
    { lng: 113.39836, lat: 22.814671 },
    { lng: 113.386658, lat: 22.803523 },
    { lng: 113.36195, lat: 22.796839 },
    { lng: 113.369432, lat: 22.778261 },
    { lng: 113.364776, lat: 22.770798 },
    { lng: 113.335464, lat: 22.755629 },
    { lng: 113.335569, lat: 22.74758 },
    { lng: 113.308573, lat: 22.742222 },
    { lng: 113.290779, lat: 22.744898 },
    { lng: 113.273042, lat: 22.731446 },
    { lng: 113.258049, lat: 22.748953 },
    { lng: 113.246303, lat: 22.749922 },
    { lng: 113.224822, lat: 22.713155 },
    { lng: 113.210741, lat: 22.703097 },
    { lng: 113.211272, lat: 22.696534 },
    { lng: 113.205193, lat: 22.688312 },
    { lng: 113.207041, lat: 22.681946 },
    { lng: 113.194381, lat: 22.680695 },
    { lng: 113.179791, lat: 22.691396 },
    { lng: 113.182132, lat: 22.686268 },
    { lng: 113.17745, lat: 22.687446 },
    { lng: 113.175875, lat: 22.68312 },
    { lng: 113.166903, lat: 22.680465 },
    { lng: 113.143447, lat: 22.695777 },
    { lng: 113.126602, lat: 22.701602 },
    { lng: 113.120459, lat: 22.707786 },
    { lng: 113.108335, lat: 22.704441 },
    { lng: 113.10385, lat: 22.708159 },
    { lng: 113.095124, lat: 22.724138 },
    { lng: 113.085598, lat: 22.755677 },
    { lng: 113.084686, lat: 22.776943 },
    { lng: 113.078045, lat: 22.791814 },
    { lng: 113.066744, lat: 22.805139 },
    { lng: 113.074209, lat: 22.819107 },
    { lng: 113.071979, lat: 22.825387 },
    { lng: 113.059332, lat: 22.830144 },
    { lng: 113.053868, lat: 22.835383 },
    { lng: 113.054857, lat: 22.839594 },
    { lng: 113.033855, lat: 22.847523 },
    { lng: 113.030379, lat: 22.85678 },
    { lng: 113.024137, lat: 22.859146 },
    { lng: 113.024318, lat: 22.864733 },
    { lng: 113.01753, lat: 22.87056 },
    { lng: 113.017082, lat: 22.877875 },
    { lng: 113.024495, lat: 22.886415 },
    { lng: 113.020524, lat: 22.889106 },
    { lng: 113.029877, lat: 22.886005 },
    { lng: 113.034941, lat: 22.889085 },
    { lng: 113.055241, lat: 22.889014 },
    { lng: 113.052933, lat: 22.900678 },
    { lng: 113.063689, lat: 22.910462 }
  ],
    sw = { lat: 22.680465, lng: 113.017082 },
    ne = { lat: 23.011415, lng: 113.39836 };

  point.equals = function (a) {
    return a && this.lat == a.lat && this.lng == a.lng;
  }

  if (!isPointInRect(point, sw, ne)) {
    return false;
  }

  var N = pts.length;
  var boundOrVertex = true;
  var intersectCount = 0;
  var precision = 2e-10;
  var p1, p2;
  var p = point;

  p1 = pts[0];//left vertex        
  for (var i = 1; i <= N; ++i) {//check all rays            
    if (p.equals(p1)) {
      return boundOrVertex;//p is an vertex
    }

    p2 = pts[i % N];//right vertex            
    if (p.lat < Math.min(p1.lat, p2.lat) || p.lat > Math.max(p1.lat, p2.lat)) {//ray is outside of our interests                
      p1 = p2;
      continue;//next ray left point
    }

    if (p.lat > Math.min(p1.lat, p2.lat) && p.lat < Math.max(p1.lat, p2.lat)) {//ray is crossing over by the algorithm (common part of)
      if (p.lng <= Math.max(p1.lng, p2.lng)) {//x is before of ray                    
        if (p1.lat == p2.lat && p.lng >= Math.min(p1.lng, p2.lng)) {//overlies on a horizontal ray
          return boundOrVertex;
        }

        if (p1.lng == p2.lng) {//ray is vertical                        
          if (p1.lng == p.lng) {//overlies on a vertical ray
            return boundOrVertex;
          } else {//before ray
            ++intersectCount;
          }
        } else {//cross point on the left side                        
          var xinters = (p.lat - p1.lat) * (p2.lng - p1.lng) / (p2.lat - p1.lat) + p1.lng;//cross point of lng                        
          if (Math.abs(p.lng - xinters) < precision) {//overlies on a ray
            return boundOrVertex;
          }

          if (p.lng < xinters) {//before ray
            ++intersectCount;
          }
        }
      }
    } else {//special case when ray is crossing through the vertex                
      if (p.lat == p2.lat && p.lng <= p2.lng) {//p crossing over p2                    
        var p3 = pts[(i + 1) % N]; //next vertex                    
        if (p.lat >= Math.min(p1.lat, p3.lat) && p.lat <= Math.max(p1.lat, p3.lat)) {//p.lat lies between p1.lat & p3.lat
          ++intersectCount;
        } else {
          intersectCount += 2;
        }
      }
    }
    p1 = p2;//next ray left point
  }

  if (intersectCount % 2 == 0) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  isPointInPolygon
}