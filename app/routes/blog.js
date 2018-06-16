const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/blog`;

  

    app.post(`${baseUrl}/create`, userController.createblog);
     /**
	 * @api {post} /api/v1/blog/create Create blog
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	
	 * @apiParam {String} title title of the blog passed as a body parameter
	 * @apiParam {String} description description of the blog passed as a body parameter
	 * @apiParam {String} bodyHtml bodyHtml of the blog passed as a body parameter
	 * @apiParam {String} category category of the blog passed as a body parameter
     *  @apiParam {String} author author of the blog passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Created successfully",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    
    app.get(`${baseUrl}/listAll`,  userController.getAllblog);
    /**
	 * @api {get} /api/v1/blog/listAll Get all blogs
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "All Blog Details Found",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Blog Details",
	    "status": 500,
	    "data": null
	   }
	 */


    app.put(`${baseUrl}/edit/:blogId`, userController.editblog);
    /**
	 * @api {put} /api/v1/blog/edit/:blogId Edit blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Edited Successfully.",
	    "status": 200,
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(`${baseUrl}/delete/:blogId`, userController.deleteblog);
     /**
	 * @api {post} /api/v1/blog/delete/:blogId Delete blog by blogId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	
	 * @apiParam {String} blogId blogId of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Deleted Successfully",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
   


    app.get(`${baseUrl}/viewbyAuthor/:author`, userController.viewbyAuthor);
     /**
	 * @api {get} /api/v1/blog/viewbyauthor/:author Get blogs by author
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	
	 * @apiParam {String} author author of the blog passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blogs Found Successfully.",
	    "status": 200,
	    "data": [
					{
						blogId: "string",
						title: "string",
						description: "string",
						bodyHtml: "string",
						views: number,
						isPublished: boolean,
						category: "string",
						author: "string",
						tags: object(type = array),
						created: "date",
						lastModified: "date"
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
    app.get(baseUrl+'/viewbyblogId/:blogId', userController.viewbyblogId);

    
    /**
	 * @api {get} /api/v1/blog/viewbyblogId/:blogId Get a single blog
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 
	 * @apiParam {String} blogId The blogId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Blog Found Successfully.",
	    "status": 200,
	    "data": {
	    			_id: "string",
	    			__v: number
					blogId: "string",
					title: "string",
					description: "string",
					bodyHtml: "string",
					views: number,
					isPublished: boolean,
					category: "string",
					author: "string",
					tags: object(type = array),
					created: "date",
					lastModified: "date"
				}
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

    
}
