const prisma = require("@prisma/client");

const seed = async(numUsers = 5, numTracks = 20, numPlaylists = 10  ) => {
  const users = Array.from({length: numUsers}, (_, i) =>({
    name: `Restaurant ${i + 1 }`,
  }));
  await prisma.user.createMany({data: users});

  const tracks = Array.from({length: numTracks}, (_, i) => ({
    name: `Song ${i + 1}`
  }));
  await prisma.track.createMany({data: tracks});

  for(let i = 0; i < numPlaylists; i++){
    const trackSize = 1 + Math.floor(1 + Math.random() * 5);
    const tracklist = Array.from({length: trackSize}, ()=> ({
      id: 1 + Math.floor(Math.random() * numTracks),
    }));

    await prisma.playlist.create({
      data: {
        ownerId: 1 + Math.floor(Math.random() * numUsers),
        tracklist: {connect: tracklist},
      },
    });
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });