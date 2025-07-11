import { useEffect } from 'react'
import s from './home.module.scss'
import cn from '~/libs/cn'
import { gsap } from '~/libs/gsap'

export const Lines = () => {
  useEffect(() => {
    const paths = document.querySelectorAll('.lines')
    gsap.set(paths, { opacity: 0 })
    gsap.to(paths, { opacity: 1, ease: 'none', duration: 0.5, delay: 2 })
  }, [])

  return (
    <div className={cn('lines', s['lines'])}>
      <svg
        width="2473"
        height="2474"
        viewBox="0 0 2473 2474"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1295.4 1192L2302.4 610.604" stroke="#E0E0D2" />
        <path d="M1297.9 1195.44L2336.47 672.533" stroke="#E0E0D2" />
        <path d="M1300.19 1199.02L2366.95 736.308" stroke="#E0E0D2" />
        <path d="M1302.29 1202.72L2393.74 801.72" stroke="#E0E0D2" />
        <path d="M1304.16 1206.54L2416.74 868.556" stroke="#E0E0D2" />
        <path d="M1305.82 1210.46L2435.89 936.597" stroke="#E0E0D2" />
        <path d="M1307.24 1214.47L2451.12 1005.62" stroke="#E0E0D2" />
        <path d="M1308.44 1218.55L2462.38 1075.4" stroke="#E0E0D2" />
        <path d="M1309.4 1222.69L2469.64 1145.71" stroke="#E0E0D2" />
        <path d="M1310.13 1226.88L2472.86 1216.32" stroke="#E0E0D2" />
        <path d="M1310.61 1231.11L2472.05 1287" stroke="#E0E0D2" />
        <path d="M1310.85 1235.36L2467.2 1357.52" stroke="#E0E0D2" />
        <path d="M1310.85 1239.61L2458.33 1427.65" stroke="#E0E0D2" />
        <path d="M1310.6 1243.86L2445.46 1497.15" stroke="#E0E0D2" />
        <path d="M1310.11 1248.08L2428.65 1565.8" stroke="#E0E0D2" />
        <path d="M1309.38 1252.28L2407.94 1633.39" stroke="#E0E0D2" />
        <path d="M1308.42 1256.42L2383.4 1699.68" stroke="#E0E0D2" />
        <path d="M1307.21 1260.5L2355.11 1764.45" stroke="#E0E0D2" />
        <path d="M1305.78 1264.5L2323.17 1827.51" stroke="#E0E0D2" />
        <path d="M1304.12 1268.42L2287.68 1888.64" stroke="#E0E0D2" />
        <path d="M1302.24 1272.24L2248.76 1947.64" stroke="#E0E0D2" />
        <path d="M1300.14 1275.94L2206.52 2004.32" stroke="#E0E0D2" />
        <path d="M1297.84 1279.51L2161.12 2058.49" stroke="#E0E0D2" />
        <path d="M1295.33 1282.95L2112.7 2109.98" stroke="#E0E0D2" />
        <path d="M1292.64 1286.24L2061.41 2158.63" stroke="#E0E0D2" />
        <path d="M1289.76 1289.37L2007.43 2204.26" stroke="#E0E0D2" />
        <path d="M1286.7 1292.33L1950.93 2246.73" stroke="#E0E0D2" />
        <path d="M1283.48 1295.12L1892.09 2285.9" stroke="#E0E0D2" />
        <path d="M1280.11 1297.71L1831.11 2321.65" stroke="#E0E0D2" />
        <path d="M1276.6 1300.1L1768.19 2353.86" stroke="#E0E0D2" />
        <path d="M1272.95 1302.29L1703.53 2382.42" stroke="#E0E0D2" />
        <path d="M1269.18 1304.27L1637.35 2407.23" stroke="#E0E0D2" />
        <path d="M1265.31 1306.04L1569.86 2428.23" stroke="#E0E0D2" />
        <path d="M1261.34 1307.57L1501.27 2445.33" stroke="#E0E0D2" />
        <path d="M1257.3 1308.88L1431.82 2458.49" stroke="#E0E0D2" />
        <path d="M1253.18 1309.95L1361.74 2467.66" stroke="#E0E0D2" />
        <path d="M1249.01 1310.79L1291.24 2472.81" stroke="#E0E0D2" />
        <path d="M1244.8 1311.39L1220.56 2473.92" stroke="#E0E0D2" />
        <path d="M1240.56 1311.74L1149.94 2470.99" stroke="#E0E0D2" />
        <path d="M1236.31 1311.86L1079.6 2464.03" stroke="#E0E0D2" />
        <path d="M1232.06 1311.73L1009.77 2453.06" stroke="#E0E0D2" />
        <path d="M1227.82 1311.35L940.684 2438.13" stroke="#E0E0D2" />
        <path d="M1223.61 1310.74L872.563 2419.27" stroke="#E0E0D2" />
        <path d="M1219.44 1309.89L805.631 2396.54" stroke="#E0E0D2" />
        <path d="M1215.33 1308.8L740.106 2370.03" stroke="#E0E0D2" />
        <path d="M1211.29 1307.47L676.203 2339.82" stroke="#E0E0D2" />
        <path d="M1207.32 1305.92L614.13 2306.01" stroke="#E0E0D2" />
        <path d="M1203.46 1304.14L554.092 2268.71" stroke="#E0E0D2" />
        <path d="M1199.7 1302.15L496.282 2228.03" stroke="#E0E0D2" />
        <path d="M1196.06 1299.94L440.892 2184.12" stroke="#E0E0D2" />
        <path d="M1192.56 1297.53L388.1 2137.12" stroke="#E0E0D2" />
        <path d="M1189.2 1294.93L338.079 2087.18" stroke="#E0E0D2" />
        <path d="M1185.99 1292.13L290.995 2034.46" stroke="#E0E0D2" />
        <path d="M1182.95 1289.16L247 1979.13" stroke="#E0E0D2" />
        <path d="M1180.08 1286.02L206.237 1921.39" stroke="#E0E0D2" />
        <path d="M1177.39 1282.72L168.841 1861.41" stroke="#E0E0D2" />
        <path d="M1174.9 1279.27L134.933 1799.39" stroke="#E0E0D2" />
        <path d="M1172.61 1275.68L104.624 1735.53" stroke="#E0E0D2" />
        <path d="M1170.53 1271.97L78.0139 1670.05" stroke="#E0E0D2" />
        <path d="M1168.67 1268.15L55.1878 1603.15" stroke="#E0E0D2" />
        <path d="M1167.02 1264.23L36.2224 1535.06" stroke="#E0E0D2" />
        <path d="M1165.61 1260.21L21.1778 1465.99" stroke="#E0E0D2" />
        <path d="M1164.42 1256.13L10.1038 1396.18" stroke="#E0E0D2" />
        <path d="M1163.47 1251.98L3.03661 1325.85" stroke="#E0E0D2" />
        <path d="M1162.76 1247.79L9.01818e-05 1255.23" stroke="#E0E0D2" />
        <path d="M1162.29 1243.56L1.00318 1184.56" stroke="#E0E0D2" />
        <path d="M1162.06 1239.31L6.04296 1114.05" stroke="#E0E0D2" />
        <path d="M1162.07 1235.06L15.1026 1043.95" stroke="#E0E0D2" />
        <path d="M1162.33 1230.81L28.1532 974.481" stroke="#E0E0D2" />
        <path d="M1162.83 1226.59L45.1517 905.871" stroke="#E0E0D2" />
        <path d="M1163.57 1222.4L66.0427 838.345" stroke="#E0E0D2" />
        <path d="M1164.55 1218.26L90.7576 772.123" stroke="#E0E0D2" />
        <path d="M1165.76 1214.18L119.216 707.421" stroke="#E0E0D2" />
        <path d="M1167.2 1210.18L151.325 644.45" stroke="#E0E0D2" />
        <path d="M1168.87 1206.27L186.98 583.417" stroke="#E0E0D2" />
        <path d="M1170.77 1202.46L226.063 524.521" stroke="#E0E0D2" />
        <path d="M1172.87 1198.76L268.448 467.954" stroke="#E0E0D2" />
        <path d="M1175.19 1195.19L313.995 413.902" stroke="#E0E0D2" />
        <path d="M1177.7 1191.76L362.557 362.54" stroke="#E0E0D2" />
        <path d="M1180.4 1188.48L413.974 314.037" stroke="#E0E0D2" />
        <path d="M1183.29 1185.35L468.078 268.551" stroke="#E0E0D2" />
        <path d="M1186.36 1182.4L524.693 226.231" stroke="#E0E0D2" />
        <path d="M1189.58 1179.63L583.633 187.214" stroke="#E0E0D2" />
        <path d="M1192.96 1177.04L644.707 151.63" stroke="#E0E0D2" />
        <path d="M1196.48 1174.66L707.714 119.592" stroke="#E0E0D2" />
        <path d="M1200.14 1172.48L772.448 91.2076" stroke="#E0E0D2" />
        <path d="M1203.91 1170.51L838.699 66.5678" stroke="#E0E0D2" />
        <path d="M1207.78 1168.76L906.249 45.7539" stroke="#E0E0D2" />
        <path d="M1211.75 1167.23L974.878 28.8335" stroke="#E0E0D2" />
        <path d="M1215.81 1165.93L1044.36 15.8621" stroke="#E0E0D2" />
        <path d="M1219.93 1164.87L1114.47 6.88211" stroke="#E0E0D2" />
        <path d="M1224.1 1164.05L1184.98 1.92273" stroke="#E0E0D2" />
        <path d="M1228.31 1163.46L1255.66 1.00027" stroke="#E0E0D2" />
        <path d="M1232.55 1163.11L1326.28 4.11723" stroke="#E0E0D2" />
        <path d="M1236.8 1163.01L1396.6 11.264" stroke="#E0E0D2" />
        <path d="M1241.06 1163.15L1466.4 22.4172" stroke="#E0E0D2" />
        <path d="M1245.29 1163.54L1535.44 37.5407" stroke="#E0E0D2" />
        <path d="M1249.5 1164.16L1603.51 56.5842" stroke="#E0E0D2" />
        <path d="M1253.67 1165.03L1670.39 79.486" stroke="#E0E0D2" />
        <path d="M1257.77 1166.13L1735.84 106.172" stroke="#E0E0D2" />
        <path d="M1261.81 1167.47L1799.66 136.553" stroke="#E0E0D2" />
        <path d="M1265.77 1169.03L1861.64 170.532" stroke="#E0E0D2" />
        <path d="M1269.63 1170.82L1921.58 207.996" stroke="#E0E0D2" />
        <path d="M1273.38 1172.82L1979.28 248.824" stroke="#E0E0D2" />
        <path d="M1277.01 1175.03L2034.55 292.882" stroke="#E0E0D2" />
        <path d="M1280.51 1177.45L2087.22 340.027" stroke="#E0E0D2" />
        <path d="M1283.87 1180.07L2137.1 390.104" stroke="#E0E0D2" />
        <path d="M1287.07 1182.87L2184.05 442.948" stroke="#E0E0D2" />
        <path d="M1290.1 1185.85L2227.89 498.389" stroke="#E0E0D2" />
        <path d="M1292.96 1189L2268.5 556.245" stroke="#E0E0D2" />
      </svg>
    </div>
  )
}
