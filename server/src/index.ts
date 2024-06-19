import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Socket } from 'socket.io';

const io = require('socket.io')(3000, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const defaultValue: string = '';

io.on('connection', (socket: Socket) => {
  socket.on('get-document', async (documentId: string) => {
    const document = await findOrCreateDocument(documentId);

    if (!document) {
      return;
    }

    socket.join(documentId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-document', async (data) => {
      await prisma.document.update({
        where: {
          id: documentId,
        },
        data: {
          data: data,
        },
      });
    });
  });
});

async function findOrCreateDocument(id: string) {
  if (id == null) return;

  let document = await prisma.document.findFirst({ where: { id: id } });
  if (!document) {
    document = await prisma.document.create({
      data: { id: id, data: defaultValue },
    });
  }
  // if (document) return document;
  // return await prisma.document.create({ data: { id: id, data: defaultValue } });
  return document;
}
