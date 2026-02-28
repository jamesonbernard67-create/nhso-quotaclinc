export default async function handler(req, res) {
  // อนุญาตให้หน้าเว็บของเราเรียกใช้ API ตัวนี้ได้
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // เปลี่ยน Method เป็น POST และแนบ Cookie ตามที่ระบบจริงต้องการ
    const response = await fetch('https://api.line.me/oauth2/v2.1/verify?access_token=eyJhbGciOiJIUzI1NiJ9.KRyOzupzIL87QKgrXEpFkYRcWNb2Vv42sGCdIE004dJCq_T4bEBz9H4bunggJkemfeuGLjXQMvI_7vhLTiLDaeguec62ToOotgB16YyD_BzLFimKjIoaAWoUcKjlGT0kMep_bMdQC5JE4PYmTec7MfiMqphBFygPXqmpdv0laq0.l-RXxIP2hLgiSVoKdxpJDVH7Dw958eXdmo_f-tEwKYA', {
      method: 'POST', // เปลี่ยนจาก GET เป็น POST
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json', // แจ้งว่าเป็นข้อมูลแบบ JSON
        // นำ Cookie ที่คุณหามาได้ ใส่เป็นบัตรผ่านประตู
        'Cookie': '_ga_RSYZ8B7GPX=GS1.1.1738934160.9.1.1738934185.0.0.0; _ga_517PBQ0JGD=GS2.1.s1752835906$o31$g1$t1752835922$j44$l0$h0; _ga=GA1.1.72913990.1722570898; _ga_TRYKLSJ30C=GS2.1.s1762919611$o3$g0$t1762919612$j59$l0$h0; NSXLB.08e66a20-88b5-4993-b298-52bdcec3f081.2c4bdfdf-08be-4219-a853-800d0458e6fc=De4V4JsjqCgu8W8ycADQxjrFCkF+hKyJRoZc0niEDTMUNZiNxxGAJO/rhHcUs3m9uyL+1VppPoBdQ5rbWwfCag==; LIFF_STORE:expires:1654412393-QTAwCDJ1=1772292119958; app_session=7d080dc6-05b4-41f7-8cfa-a1d27b46d34e',
        'Referer': 'https://liffquota.nhso.go.th/'
      },
      // ส่งข้อมูลว่างๆ ไป (API แบบ POST มักจะต้องการ Body แม้จะไม่มีอะไรส่งไปก็ตาม)
      body: JSON.stringify({}) 
    });

    if (!response.ok) {
      throw new Error(`สปสช. ตอบกลับด้วยรหัส: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
    
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: error.message });
  }
}
