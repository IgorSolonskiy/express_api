import {Router} from 'express';

const router = Router();

router.get('/api/users',(req,res)=>{
  return res.status(200).json('server is work')
})

export default  router;