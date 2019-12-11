class EpisodesController < ApplicationController
  def index
    @episodes = Episode.where(episode_params)
    render json: { data: @episodes }
  end

  private

  def episode_params
    # params.permit(:course_id)
    nil
  end
end
