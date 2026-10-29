/**
 * TEMPORARY filler photos from Unsplash, used until the hotel's own photos arrive.
 * To replace: put real photos in /public/photos and swap the paths in the content files
 * (or point these keys at the new files). If a filler fails to load, the branded placeholder shows instead.
 */
const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const stock = {
  hero: u("1566073771259-6a8506099945", 2400),
  exterior: u("1542314831-068cd1dbfeeb"),
  exteriorNight: u("1551882547-ff40c63fe5fa"),
  pool: u("1571896349842-33c89424de2d"),
  lobby: u("1445019980597-93fa8acb246c"),
  lobby2: u("1564501049412-61c2a3083791"),
  room1: u("1611892440504-42a792e24d32"),
  room2: u("1590490360182-c33d57733427"),
  room3: u("1618773928121-c32242e63f39"),
  room4: u("1582719478250-c89cae4dc85b"),
  room5: u("1631049307264-da0ec9d70304"),
  room6: u("1566665797739-1674de7a421a"),
  room7: u("1578683010236-d716f9a3f461"),
  room8: u("1596394516093-501ba68a0ba6"),
  bedroom: u("1505693416388-ac5ce068fe85"),
  bedroom2: u("1522771739844-6a9f6d5f14af"),
  bath: u("1584132967334-10e028bd69f7"),
  bath2: u("1552321554-5fefe8c9ef14"),
  restaurant: u("1414235077428-338989a2e8c0"),
  restaurant2: u("1517248135467-4c7edcad34c4"),
  restaurant3: u("1559339352-11d035aa65de"),
  coffee: u("1495474472287-4d71bcdd2085"),
  coffee2: u("1509042239860-f550ce710b93"),
  meeting: u("1431540015161-0bf868a2d407"),
  office: u("1497366216548-37526070297c"),
};
