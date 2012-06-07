<import resource="classpath:/alfresco/templates/webscripts/org/alfresco/slingshot/documentlibrary/action/action.lib.js">

/**
 * Cancel checkout file action
 * @method POST
 * @param uri {string} /{siteId}/{containerId}/{filepath}
 */

/**
 * Entrypoint required by action.lib.js
 *
 * @method runAction
 * @param p_params {object} standard action parameters: nodeRef, siteId, containerId, path
 * @return {object|null} object representation of action result
 */
function runAction(p_params)
{
   var results;

   try
   {
      // Initialise to the destNode (will be updated to the original if a working copy)...
      var originalDoc = p_params.destNode;
      if (p_params.destNode.hasAspect("cm:workingcopy"))
      {
         // If the node is a working copy then cancel the checkout and set the original...
         originalDoc = p_params.destNode.cancelCheckout();
         if (originalDoc === null)
         {
            status.setCode(status.STATUS_INTERNAL_SERVER_ERROR, "Could not cancel checkout: " + url.extension);
            return;
         }
      }
      else if (node.isLocked && !node.hasAspect("trx:transferred"))
      {
         // ...or, if the node is locked then just unlock it...
         p_params.destNode.unlock();
      }

      var resultId = originalDoc.name,
         resultNodeRef = originalDoc.nodeRef.toString();

      // Construct the result object
      results = [
      {
         id: resultId,
         nodeRef: resultNodeRef,
         action: "cancelCheckoutAsset",
         success: true
      }];
   }
   catch(e)
   {
      e.code = status.STATUS_INTERNAL_SERVER_ERROR;
      e.message = e.toString();
      throw e;
   }

   return results;
}

/* Bootstrap action script */
main();
