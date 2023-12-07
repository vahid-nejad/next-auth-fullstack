const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
     async function getUser(email:any) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });
      
          return user;
        } catch (error) {
          console.error('Error fetching user:', error);
          throw error; 
        }
      }
      const User = await getUser('sakura@gmail.com')
      console.log(User)
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });