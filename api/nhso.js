export default async function handler(req, res) {
  // อนุญาตให้หน้าเว็บของเราเรียกใช้ API ตัวนี้ได้
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    // เปลี่ยน Method เป็น POST และแนบ Cookie ตามที่ระบบจริงต้องการ
    const response = await fetch('https://api.line.me/oauth2/v2.1/verify?access_token=eyJhbGciOiJIUzI1NiJ9.KRyOzupzIL87QKgrXEpFkYRcWNb2Vv42sGCdIE004dJCq_T4bEBz9H4bunggJkemfeuGLjXQMvI_7vhLTiLDaeguec62ToOotgB16YyD_BzLFimKjIoaAWoUcKjlGT0kMep_bMdQC5JE4PYmTec7MfiMqphBFygPXqmpdv0laq0.l-RXxIP2hLgiSVoKdxpJDVH7Dw958eXdmo_f-tEwKYA', {
      method: 'GET', // เปลี่ยนจาก GET เป็น POST
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json', // แจ้งว่าเป็นข้อมูลแบบ JSON
        // นำ Cookie ที่คุณหามาได้ ใส่เป็นบัตรผ่านประตู
        'Cookie': 'eyJhbGciOiJIUzI1NiJ9.KRyOzupzIL87QKgrXEpFkYRcWNb2Vv42sGCdIE004dJCq_T4bEBz9H4bunggJkemfeuGLjXQMvI_7vhLTiLDaeguec62ToOotgB16YyD_BzLFimKjIoaAWoUcKjlGT0kMep_bMdQC5JE4PYmTec7MfiMqphBFygPXqmpdv0laq0.l-RXxIP2hLgiSVoKdxpJDVH7Dw958eXdmo_f-tEwKYA',
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
