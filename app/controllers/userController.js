const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const check = require('../libs/checkLib')

/* Models */
const blogModel = mongoose.model('Blog')

let createblog =(req, res)=>{
    if(check.isEmpty(req.body.blogTitle)|| check.isEmpty(req.body.category) || check.isEmpty(req.body.bodyHtml)|| check.isEmpty(req.body.description) ||check.isEmpty(req.body.author) )
    {
        let  apiresponse = response.generate('true', 'required parameters are missing', 403,null)
        res.send(apiresponse)
    }
    else{

        let newblog = new  blogModel({
           
            blogId:shortid.generate(),
            description:req.body.description,
            author:req.body.author,
            blogTitle:req.body.blogTitle,
            isPublished:true,
            category:req.body.category,
            bodyHtml:req.body.bodyHtml,
            created:Date.now(),
            lastModified:Date.now()

        })
        let tags = (req.body.tags!=undefined  && req.body.tags!=null && req.body.tags=='')?req.body.tags.split(','):[]
        newblog.tags = tags;

        newblog.save((err, result)=>{
           if(err)
           {
               console.log('error occured')
               logger.error(`error occured ${err}` ,'database', 10);
               let apiresponse = response.generate('true', 'error occured', 500, null )
               res.send(apiresponse)
               
           }
           res.send(result)
           console.log('blog creation succesfull')


        })

    }
}

let editblog =( req, res)=>{
           if(check.isEmpty(req.params.blogId))
           {
               let apiresponse  = response.generate('true', 'required parameter is missing',403, null)
               res.send(apiresponse)
           }
           else {
               let options = req.body;
            blogModel.update({'blogId':req.params.blogId},options, {multi:true}, (err, result)=>{
                if(err)
                {
                    logger.error(`error occured  ${err}`, 'database', 10)
                    let apiresponse = response.generate('true', 'error occured', 500, null)
                    res.send(apiresponse)
                }
                else if (check.isEmpty(result)){
                      let apiresponse = response.generate('true','blog not found', 404, null)
                      res.send(apiresponse)
                }
                else{
                    let apiresponse = response.generate('flase', 'blog edited succesfully', 200, result )
                    res.send(apiresponse)

                }
            })
           }
}

let deleteblog =( req, res)=>{
         if(check.isEmpty(req.params.blogId))
         {
             let apiresponse = response.generate('true', 'required parameter missing', 403, null)
             res.send(apiresponse)
         }
         else{
            blogModel.deleteOne({'blogId':req.params.blogId},(err, result)=>{
                if(err)
                {
                    logger.error(`error occured ${err}`, 'database', 10)
                    let apiresponse = response.generate('true','error occured', 403, null)
                    res.send(apiresponse)
                }
                else if(check.isEmpty(result))
                {
                    let apiresponse= response.generate('true', 'blog not found', 500, null)
                    res.send (apiresponse)
                }
                else{
                    let apiresponse = response.generate('true', 'blog deleted succesfully', 200, result)
                    res.send(apiresponse)
                }
            } )
         }

}

let getAllblog =(req, res)=>{
    blogModel.find()
    .select('-__v -__id')
    .lean()
    .exec((err, result)=>{
        if(err)
        {
          logger.error(`error occured ${err}`, 'database', 10);
          let apiresponse = response.generate('true', 'error occured', 403,null )

          res.send(apiresponse)   
        }
        else if(check.isEmpty(result)){
             let apiresponse = response.generate('true', ' blog not found', 404, null)
             res.send(apiresponse)

        }
        else{
            
            let apiresponse = response.generate('false','  blogs found ', 200, result );
            res.send(apiresponse)
        }
    })
}

let findblogtoedit =()=>{
     if(check.isEmpty(req.params.blogId))
     {
         let apiresponse = response.generate('true', 'required parameter  missing')
         res.send(apiresponse)
     }
     else {
        blogModel.findOne({'blogId':req.params.blogId}, (err, result)=>{
            if(err)
            {
                logger.error(`error occured ${err}`, 'database', 10)
                let apiresponse = response.generate('true', 'error occured', 500, null)
                res.send(apiresponse)
            }
            else  if(check.isEmpty(result)){
                let apiresponse = response.generate('true', 'blog  not found', 404, null)
                res.send(apiresponse)
            }

            else{
                let  apiresponse = response.generate('false', 'blog   found' , 200, result )
                res.send(apiresponse)
            }
        })
     }
    }

     let viewbyAuthor = (req, res)=>{

         if(check.isEmpty(req.params.author))
         {
             let apiresponse = response.generate('true', 'required parameter missing', 403, null)
             res.send(apiresponse)
         }
         else {
            blogModel.findOne({'author':req.params.author}, (err, result)=>{
                if(err)
                {
                    logger.error(`error occured ${err}`, 'database', 10 )
                    let apiresponse = response.generate('true', 'error occured', 500,null )
                    res.send(apiresponse)
                }
                else if(check.isEmpty(result))
                {
                    let apiresponse = response.generate('true', 'blog  not found', 404, null)
                    res.send(apiresponse)
                }
                else{
                    let apiresponse = response.generate('false', 'blog   found', 200, result)
                    res.send(apiresponse)
                }
            })
         }
     }



let viewbyblogId =(req, res)=>{
    if(check.isEmpty(req.params.blogId))
    {
        let apiresponse = response.generate('true', 'required parameter missing', 403, null)
        res.send(apiresponse)
    }
    else{
        blogModel.findOne({'blogId':req.params.blogId}, (err, result)=>{
            if(err)
            {
                logger.error(`error occured ${err}`, 'database', 10)
                let apiresponse = response.generate('true', 'error occured', 500,null )
                res.send(apiresponse)
            }

            else if (check.isEmpty(result))
            {
                  let apiresponse = response.generate('true', 'blog not found', 404, null)
                  res.send(apiresponse)

            }
            else{
                
                let apiresponse = response.generate('false', 'blog  found' , 200, result)
                res.send(apiresponse)
            }
        })
    }
}






module.exports = {
createblog:createblog,
deleteblog:deleteblog,
editblog:editblog,
getAllblog:getAllblog,
viewbyAuthor:viewbyAuthor,
viewbyblogId:viewbyblogId,
findblogtoedit:findblogtoedit
   

}// end exports