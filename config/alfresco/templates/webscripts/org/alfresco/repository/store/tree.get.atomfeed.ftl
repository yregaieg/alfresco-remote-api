[#ftl]
[#import "/org/alfresco/cmis/ns.lib.atom.ftl" as nsLib/]
[#import "/org/alfresco/cmis/links.lib.atom.ftl" as linksLib/]
[#import "/org/alfresco/cmis/atomfeed.lib.atom.ftl" as feedLib/]
[#import "/org/alfresco/cmis/atomentry.lib.atom.ftl" as entryLib/]
[#compress]

<?xml version="1.0" encoding="UTF-8"?>
<feed [@nsLib.feedNS/]>

[@feedLib.node node "tree"]
  [@linksLib.linkservice/]
  [@linksLib.linkself/]
  [#assign nodeuri][@linksLib.nodeuri node/][/#assign]
  [@linksLib.linkvia href="${nodeuri}"/]
  [#if cmisproperty(node, cmisconstants.PROP_PARENT_ID)?is_string]
    [@linksLib.linkchildren node.parent "${cmisconstants.REL_UP}"/]
  [/#if]
  [@linksLib.linkchildren node/]
  [@linksLib.linkdescendants node/]
[/@feedLib.node]

[#if depth &gt; 0 || depth == -1]
[#list cmischildren(node, "folders") as child]
  [@entryLib.foldertree node=child propfilter=propFilter includeallowableactions=includeAllowableActions includerelationships=false maxdepth=depth/]
[/#list]
[/#if]

</feed>

[/#compress]