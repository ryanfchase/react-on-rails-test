class User < ApplicationRecord
  has_secure_password

  validates_presence_of :email
  validate_uniqueness_of :email
end
