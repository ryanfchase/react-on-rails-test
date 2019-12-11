class Episode < ApplicationRecord
  belongs_to :section
  belongs_to :course
end
