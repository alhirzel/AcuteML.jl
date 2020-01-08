export AbsDocOrNode, AbsDocument, AbsNode, AbsXml, AbsHtml, AbsAttribute, AbsNormal, AbsEmpty

abstract type AbsDocOrNode end

abstract type AbsDocument <:AbsDocOrNode end
abstract type AbsNode <:AbsDocOrNode end

# Documents
abstract type AbsXml <: AbsDocument end
abstract type AbsHtml <: AbsDocument end

# Nodes
abstract type AbsNormal <: AbsNode end
abstract type AbsAttribute <: AbsNode end
abstract type AbsEmpty <: AbsNode end

# Ignore
abstract type AbsIgnore end

################################################################
