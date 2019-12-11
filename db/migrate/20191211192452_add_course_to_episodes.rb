class AddCourseToEpisodes < ActiveRecord::Migration[6.0]
  def change
    add_reference :episodes, :course, foreign_key: true
  end
end
