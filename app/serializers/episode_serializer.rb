class EpisodeSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price
end